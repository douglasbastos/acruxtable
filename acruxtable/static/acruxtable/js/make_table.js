
function MakeTable(config) {
    return this.init(config);
}

;(function($){

    MakeTable.prototype = {

        init: function(config) {
            'use strict';

            this.sortBy = config.sortBy;
            this.selectClass = config.selectClass;
            this.paginate = config.paginate || 10;
            this.sortOrder = config.sortOrder || 'asc';
            this.page = config.page || 1;

            this.getJson();
            this.makeOrdination();
        },

        getJson: function(){
            'use strict';
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
                classClick = this.className;
                statusArrow = $('th div').attr('class');

                if (statusArrow === 'asc')
                    changeStatusArrow = 'desc';
                else
                    changeStatusArrow = 'asc';

                $("."+statusArrow).remove();
                $("."+classClick).append('<div class="'+ changeStatusArrow +'"></div>');

                self.orderItems(classClick, changeStatusArrow);
            });
        },

        getItems: function(items){
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
            table = '';
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
                allItems = [];
                $.each(self.items, function(i, item){
                    if (self.isToday(item.date))
                        allItems.push(item);
                });
                self.showTodayItems(allItems);
            });
            $(".removeFilter").click(function(){
                self.removeFilter();
            });
            $("input#searchItems").keyup(function() {
                var value = $(this).val();
                    self.getItemsResearched(value);
                    $("p").text("Filtrando por: "+ value);
                }).keyup();
        },

        getItemsResearched: function(search){
            // 'use strict';
            var self = this;
            allItems = []
            $.each(this.items, function(i, item){
                existName = self.items[i].name.trim().toLowerCase().match(search.toLowerCase())
                existSubject = self.items[i].subject.trim().toLowerCase().match(search.toLowerCase())
                if (existName || existSubject)
                    allItems.push(item)
            });
            self.showItemsResearched(allItems);
        },

        showItemsResearched: function(itemsToday){
            this.itemsAux = this.items;
            this.items = itemsToday;
            this.createTable();
            this.createPagination();
            this.page = 1;
            $(".filter").hide();
            $(".removeFilter").show();
        },

        showTodayItems: function(itemsToday){
            this.itemsAux = this.items;
            this.items = itemsToday;
            this.createTable();
            this.createPagination();
            this.page = 1;
            $(".filter").hide();
            $(".removeFilter").show();
        },

        removeFilter: function(){
            this.items = this.itemsAux;
            this.createTable();
            this.createPagination();
            this.page = 1;
            $(".removeFilter").hide();
            $(".filter").show();
        },

        formatDate: function(date){
            d = new Date(date);
            if (this.isToday(date)){
                hour = d.getHours();
                minutes = d.getMinutes();
                dateString = hour+':'+minutes;
            }
            else{
                day = d.getDate();
                month = d.getMonth()+1;
                year = d.getFullYear();

                if (day.toString().length === 1)
                    day = '0'+day;
                if (month.toString().length === 1)
                    month = '0'+month;

                dateString = day +'/'+ month +'/'+ year;
            }
            return dateString;
        },

        isToday: function(date){
            today = new Date();
            d = new Date(date);
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
            text = "Exibindo de "+ (this.start+1) +" a "+ (this.end+1) +" em um total de "+ this.items.length +" itens.";
            $("#totalItems").text(text);
        }

    };

}(jQuery));
