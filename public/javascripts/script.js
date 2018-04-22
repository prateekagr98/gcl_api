var Subscriptions = function(){
	this.subscriptions = [];
	this.current_page = 1;
	this.limit = 10;
};

Subscriptions.prototype.render = function(){
	
	$('#table-rows').empty();

	this.subscriptions.forEach(function(item, index) {
		$('#table-rows').append(
			$('<tr/>').append(
				$('<th/>', {
					text: index + 1
				})
			).append(
				$('<td/>', {
					text: item.name
				})
			).append(
				$('<td/>', {
					text: item.email
				})
			).append(
				$('<td/>', {
					text: item.occupation
				})
			).append(
				$('<td/>', {
					text: item.industry
				})
			).append(
				$('<td/>', {
					text: item.note
				})
			)
		);
	});
};

Subscriptions.prototype.increasePage = function() {
	this.current_page = this.current_page + 1;
	this.fetch();
};

Subscriptions.prototype.decreasePage = function() {
	if(this.current_page === 1){
		return;
	}

	this.current_page = this.current_page - 1;
	this.fetch();
};

Subscriptions.prototype.fetch = function() {
	var self = this;
	var url = '/api/subscriptions?limit=' + this.limit + '&page=' + this.current_page;

	$.get(url, function(data) {
		if(data.subscriptions && data.subscriptions.length){
			self.subscriptions = data.subscriptions;
			self.render();
		}
	});
};

$(document).ready(function(){
	var SubscriptionsModel = new Subscriptions();
	SubscriptionsModel.fetch();

	$('#previous').on('click', function(){
		SubscriptionsModel.decreasePage();
	});

	$('#next').on('click', function(){
		SubscriptionsModel.increasePage();
	});

	$('#export-csv').on('click', function(){

		var url = '/api/subscriptions/all';

		$.get(url, function(data) {
			var emails = data.subscriptions.map(function(item){ return item.email });

			var csvContent = "data:text/csv;charset=utf-8,";
			emails.forEach(function(email){
			   var row = email;
			   csvContent += row + "\r\n";
			});

			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "emails.csv");
			link.innerHTML= "Download";
			document.body.appendChild(link); // Required for FF

			link.click(); // This will download the data file named "my_data.csv".

		});
	});
});