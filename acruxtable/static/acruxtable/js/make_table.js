
function MakeTable(config) {
    return this.init(config);
}

;(function($){

    MakeTable.prototype = {

        init: function(config) {
            'use strict';

            this.paginate = config.paginate;
            this.ordering = config.selects;

            this.initConfig();

        },

        initConfig: function() {
            'use strict';
            this.getJson()

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

        createTable: function(items){
            table = '';
            var self = this;
            $.each(items, function(i, item) {
                table += [
                '<tr>',
                    '<td>' + item.name + '</td>',
                    '<td>' + self.formatDate(item.date) + '</td>',
                    '<td>' + item.subject + '</td>',
                '</tr>',
                ].join('');
            });
            $('#conteudo').html(table)
        },

        formatDate: function(date){
            d = new Date(date);

            // Chama método isToday
            // return o resultado do método que será criado is_today
            day = d.getDate();
            month = d.getMonth()+1;
            year = d.getFullYear();

            console.log(day.toString().length);
            if (day.toString().length === 1)
                day = '0'+day;
            if (month.toString().length === 1)
                month = '0'+month;

            return day +'/'+ month +'/'+ year;

        }

        isToday: function(date){
            return false;
        }
    };

}(jQuery));
