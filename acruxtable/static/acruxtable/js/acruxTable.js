
function MakeTable(config) {
    return this.init(config);
}

;(function($){
    'use strict';

    MakeTable.prototype = {

        init: function(config) {
            this.sortBy = config.sortBy;
            this.selectClass = config.selectClass;
            this.paginate = config.paginate || 10;
            this.sortOrder = config.sortOrder || 'asc';
            this.page = config.page || 1;

            this.getJson();
            this.makeOrdination();
        },

        getJson: function(){
            var self = this;
            $.ajax({
                type: 'GET',
                url: 'emails.json',
                dataType: 'json',
                success: function (data) {
                    self.getItems(data);
                }
            });
        },

        makeOrdination: function(){
            $("."+this.sortBy).append('<div class="'+ this.sortOrder +'"></div>');

            var self = this;
            $('th').click(function(){
                var classClick = this.className;
                var statusArrow = $('th div').attr('class');

                if (statusArrow === 'asc')
                    var changeStatusArrow = 'desc';
                else
                    var changeStatusArrow = 'asc';

                $("."+statusArrow).remove();
                $("."+classClick).append('<div class="'+ changeStatusArrow +'"></div>');

                self.orderItems(classClick, changeStatusArrow);
            });
        },

        getItems: function(items){
            // Nunca altere this.itemsConst
            this.itemsConst = items;
            this.items = items;
            this.orderItems(this.sortBy, this.sortOrder);
            this.createPagination();
            this.eventsJquery();
        },

        orderItems: function(sortBy, sortOrder){
            if (sortOrder === 'asc')
                this.items = _.sortBy(this.items, sortBy);
            else if (sortOrder === 'desc')
                this.items = _.sortBy(this.items, sortBy).reverse();
            else
                throw("sortOrder aceita somente [asc|desc]");

            this.createTable();
        },

        createTable: function(){
            var table = '';
            this.start = this.paginate * (this.page-1);
            this.end = (this.paginate * this.page) - 1;

            if (this.end > this.items.length)
                this.end = (this.items.length-1);

            var self = this;
            $.each(this.items, function(i, item) {
                if (!(self.start <= i && i <= self.end)){ return; }
                table += [
                '<tr>',
                    '<td>' + item.name + '</td>',
                    '<td>' + item.subject + '</td>',
                    '<td>' + self.formatDate(item.date) + '</td>',
                '</tr>',
                ].join('');
            });

            $(this.selectClass+" *").remove();
            $(this.selectClass).html(table);
            self.createInfoTotalItems();
        },

        eventsJquery: function(){
            var self = this;

            $(".filter").click(function(){
                var allItems = [];
                $.each(self.items, function(i, item){
                    if (self.isToday(item.date))
                        allItems.push(item);
                });
                self.showTodayItems(allItems);
            });
            $(".remove-filter-today").click(function(){
                self.removeFilter();
            });
            $("input#search-items-input").keyup(function() {
                var value = $(this).val();
                    self.getItemsResearched(value);
                    $("span.text-researched").html(value);
                    $("p.info-filter").show();
                }).keydown();
            $(".remove-filter-input").click(function(){
                $("input#search-items-input").val("");
                $("p.info-filter").hide();
            })
        },

        getItemsResearched: function(search){
            var self = this

            var allItems = []
            $.each(this.itemsConst, function(i, item){
                var existName = self.itemsConst[i].name.trim().toLowerCase().match(search.toLowerCase());
                // console.log(existName)
                var existSubject = self.itemsConst[i].subject.trim().toLowerCase().match(search.toLowerCase());
                // console.log(existSubject)
                // console.log("================");
                if (existName || existSubject)
                    allItems.push(item)
            });
            // console.log(search.toLowerCase())
            self.showResearchedItems(allItems);
        },

        showResearchedItems: function(itemsResearched){
            this.showItemsFiltered(itemsResearched);
        },

        showTodayItems: function(itemsToday){
            this.showItemsFiltered(itemsToday);
            $(".filter").hide();
            $(".remove-filter-today").show();
        },

        showItemsFiltered: function(items){
            this.items = items;
            this.createTable();
            this.createPagination();
            this.page = 1;
        },

        removeFilter: function(){
            this.items = this.itemsConst;
            this.createTable();
            this.createPagination();
            this.page = 1;
            $(".remove-filter-today").hide();
            $(".filter").show();
        },

        formatDate: function(date){
            var d = new Date(date);
            if (this.isToday(date)){
                var hour = d.getHours();
                var minutes = d.getMinutes();
                var dateString = hour+':'+minutes;
            }
            else{
                var day = d.getDate();
                var month = d.getMonth()+1;
                var year = d.getFullYear();

                if (day.toString().length === 1)
                    day = '0'+day;
                if (month.toString().length === 1)
                    month = '0'+month;

                dateString = day +'/'+ month +'/'+ year;
            }
            return dateString;
        },

        isToday: function(date){
            var today = new Date();
            var d = new Date(date);
            return (today.toDateString() == d.toDateString());
        },

        createPagination: function(){
            var self = this;
            $(document).ready(function() {
                $("#pagination").pagination({
                    items: self.items.length,
                    itemsOnPage: self.paginate,
                    cssStyle: 'light-theme'
                });
            });
            this.page = this.getCurrentPage() || this.page;
        },

        getCurrentPage: function(){
            var self = this;
            $("#pagination").click(function(){
                self.currentPage($("#pagination").pagination('getCurrentPage'));
                self.createTable();
            });
        },

        currentPage: function(page){
            this.page = page;
        },

        createInfoTotalItems: function(){
            var text = "Exibindo de "+ (this.start+1) +" a "+ (this.end+1) +" em um total de "+ this.items.length +" itens.";
            $("#totalItems").text(text);
        }

    };

}(jQuery));
