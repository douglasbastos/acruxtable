
function MakeTable(config) {
    return this.init(config);
}

;(function($){

    MakeTable.prototype = {

        init: function(config) {
            'use strict';

            this.paginate = config.paginate;
            this.sortBy = config.sortBy;
            this.selectClass = config.selectClass;

            this.getJson();
            this.clickOrder(); //Mudar nome desse método para changeOrdination
        },

        getJson: function(){
            'use strict';
            var self = this;
            $.ajax({
                type: 'GET',
                url: 'emails.json',
                dataType: 'json',
                success: function (data) {
                    self.orderItems(data, self.sortBy)
                }
            });
        },

        clickOrder: function(){
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

                $(self.selectClass).hide();
                self.orderItems(self.items, classClick, changeStatusArrow);
            });
        },

        orderItems: function(items, sortBy, sortOrder){
            // order_by = typeof order_by !== 'undefined' ? order_by : 'asc';

            this.items = _.sortBy(items, sortBy);
            this.createTable(this.items);
        },

        createTable: function(items){
            table = '';
            var self = this;
            $.each(items, function(i, item) {
                table += [
                '<tr>',
                    '<td>' + item.name + '</td>',
                    '<td>' + item.subject + '</td>',
                    '<td>' + self.formatDate(item.date) + '</td>',
                '</tr>',
                ].join('');
            });
            $(this.selectClass).html(table)
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
        }

    };

}(jQuery));
