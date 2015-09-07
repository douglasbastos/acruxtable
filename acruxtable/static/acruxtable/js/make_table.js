
function MakeTable(config) {
    return this.init(config);
}

;(function($){

    MakeTable.prototype = {

        init: function(config) {
            'use strict';

            this.paginate = config.paginate;
            this.ordering = config.ordering;
            this.selectClass = config.selectClass;

            this.getJson();
            this.clickOrder();
        },

        getJson: function(){
            'use strict';
            var self = this;
            $.ajax({
                type: 'GET',
                url: 'emails.json',
                dataType: 'json',
                success: function (data) {
                    self.createTable(data)
                }
            });
        },

        clickOrder: function(){
            $('th').click(function(){
                classClick = '.'+this.className;
                statusArrow = $('th div').attr('class');

                if (statusArrow === 'down')
                    changeStatusArrow = 'up';
                else
                    changeStatusArrow = 'down';

                $("."+statusArrow).remove();
                $(classClick).append('<div class="'+ changeStatusArrow +'"></div>');
            });
        },

        createTable: function(items){
            table = '';
            items = this.orderItems(items);
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

        orderItems: function(items){
            return _.sortBy(items, this.ordering);
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
