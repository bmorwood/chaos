(function () {

    var Service = Chaos.Singleton.extend({
        name: 'Service',
        initServiceWithConfig: function($url, $success, $fault) {
            $.get($url, function ($data) {

                if (typeof $data === 'string')
                    $data = JSON.parse($data);

                $success($data);
            }).error(function ($data) {
                $fault($data);
            });
        }
    });

    Chaos.Service = Service;
}());