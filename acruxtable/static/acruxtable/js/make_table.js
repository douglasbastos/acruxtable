
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
            $.each(items, function(i, item) {
                table += [
                '<tr>',
                    '<td>' + item.name + '</td>',
                    '<td>' + item.date + '</td>',
                    '<td>' + item.subject + '</td>',
                '</tr>',
                ].join('');
            });
            $('#conteudo').html(table)
        },

    };

}(jQuery));
