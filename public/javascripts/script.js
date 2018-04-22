var Subscriptions = function(){
	this.subscriptions = [];
	this.current_page = 1;
	this.limit = 10;
};

Subscriptions.prototype.render = function(){
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
});