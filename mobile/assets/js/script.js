
$(document).ready(function(){

    var eh = {

        modal: function(state, content){

            var tpl = '<div class="eh-modal-holder">' +
                '<div class="eh-modal-fader"></div>' +
                '<div class="eh-modal-scroll"><div class="eh-modal-inner">'+content+'<div class="eh-modal-close"><i class="fa fa-times"></i></div></div></div>' +
                '</div>';

            $('.eh-modal-holder').remove();

            if(state){

                $('body').css('overflow', 'hidden');

                $('body').prepend(tpl);

                $('.eh-modal-close').off('click').on('click', function () {
                    $('.eh-modal-holder').remove();
                    $('body').css('overflow', 'inherit');
                });

            }else{
                $('body').css('overflow', 'inherit');
                $('.eh-modal-holder').remove();
            }

        },

        dialog: function(obj){

            var tpl = '<div class="eh-dialog-holder">' +
                '<div class="eh-dialog-fader"></div>' +
                '<div class="eh-dialog-scroll">' +
                '<div class="eh-dialog-inner">' +
                    '<div class="eh-dialog-title">{{title}}</div>' +
                    '<div class="eh-dialog-content">{{content}}</div>' +
                    '<div class="eh-dialog-footer">' +
                        '{{#buttons}}<div class="eh-dialog-button" data-id="{{id}}">{{label}}</div>{{/buttons}}' +
                    '</div>' +
                '<div class="eh-dialog-close"><i class="fa fa-times"></i></div>' +
                '</div>' +
                '</div>' +
                '</div>';

            var mO = {
                title: obj.title,
                content: obj.content,
                buttons: []
            };

            for(var i in obj.buttons){

                mO.buttons.push({
                    id: i,
                    label: obj.buttons[i].label
                });
            }

            $('body').css('overflow', 'hidden');

            $('body').prepend(Mustache.to_html(tpl, mO));

            $('.eh-dialog-close').off('click').on('click', function () {
                $('.eh-dialog-holder').remove();
                $('body').css('overflow', 'inherit');
            });

            $('.eh-dialog-holder').eq(0).find('.eh-dialog-button').off('click').on('click', function(){

                obj.buttons[$(this).attr('data-id')].callback();

            });


        },

        getHall: function(cb){

            var o = {
                command: 'get_hall'
            };

            console.log('111');

            socketQuery_site(o, function (res) {

                console.log('asdsa', res);

            });

        }

    };

    eh.getHall();


    $('.main-search-param-box').off('click').on('click', function(){

        $('.main-search-block').not($(this).parents('.main-search-block')).removeClass('opened');
        $(this).parents('.main-search-block').toggleClass('opened');

    });

    $('.e-search-param-box').off('click').on('click', function(){

        $('.e-search-block').not($(this).parents('.e-search-block')).removeClass('opened');
        $(this).parents('.e-search-block').toggleClass('opened');

    });

    $('.venue-images-dot').off('click').on('click', function () {

        if($(this).hasClass('active')){
            return;
        }

        var self  =$(this);
        var idx = $(this).index();
        var p = $(this).parents('.venue-images-box');
        var t = p.find('.venue-images-train');

        t.animate({
            marginLeft: - (idx * 300) + 'px'
        }, 220, function () {

            p.find('.venue-images-dot').removeClass('active');
            self.addClass('active');

        });

    });

    $('.hall-images-dot').off('click').on('click', function () {

        if($(this).hasClass('active')){
            return;
        }

        var self  =$(this);
        var idx = $(this).index();
        var p = $(this).parents('.h-bg-holder');
        var t = p.find('.h-bg-train');

        t.animate({
            marginLeft: - (idx * 100) + '%'
        }, 220, function () {

            p.find('.hall-images-dot').removeClass('active');
            self.addClass('active');

        });

    });

    $('.e-search-pick-param').off('click').on('click', function(){

        $(this).toggleClass('checked');

    });

    $('.map-search-extended-toggler').off('click').on('click', function(){

        $(this).toggleClass('opened');
        if($(this).hasClass('opened')){
            $(this).html('Скрыть расширенный поиск');
        }else{
            $(this).html('Расширенный поиск');
        }
        $('.map-search-extended').toggleClass('opened');

    });

    $('.quick-view-init').off('click').on('click', function () {

        eh.modal(true, test_venue_html);

    });

    $('.register-venue').off('click').on('click', function(){

        eh.dialog({
            title: 'Разместить площадку',
            content: 'На Ваш email отправлено письмо с дальнейшими инструкциями.',
            buttons: {
                success: {
                    label: 'Продолжить',
                    callback: function(){

                        location.href = 'step_1.html'

                    }
                }
            }
        });

    });

    $('.eh-c-control-date').datepicker({
        format: "dd.mm.yyyy",
        language: "ru",
        autoclose: true
    });

    $('.tpl-new-venue .venue-tag').off('click').on('click', function(){

        $(this).toggleClass('disabled');

    });


    $('.step-1-save').off('click').on('click', function(){

        location.href = 'step_2.html';

    });

    tinymce.init({
        selector: 'textarea.eh-c-control',
        init_instance_callback: function (editor) {
            editor.on('KeyUp', function (e) {

                //var block = $(editor.editorContainer).parents('.fn-field').eq(0);
                //var columnName = block.attr('data-column');
                //var type = block.attr('data-type');
                //var dataValue = "";
                //var value = editor.getContent();
                //
                //var chO = {
                //    column_name: columnName,
                //    type: type,
                //    value: {
                //        value: value,
                //        selValue: ''
                //    }
                //};
                //
                //if (_t.data != "new") dataValue = _t.data.data[0][columnName];
                //
                //if (value != dataValue) {
                //    _t.addChange(chO);
                //}
                //else {
                //    _t.removeChange(chO);
                //}

            });
        }
    });




    //---

    var formWrapper = $('.formWrapper');

    var myMap,
        coords = [55.749491, 37.591512],
        zoom = 8,
        metroLinesCatalog = [
            { name: "Россия, Москва, Сокольническая линия", title: "Сокольническая", color: "rgb(237, 27, 53)"},
            { name: "Россия, Москва, Замоскворецкая линия", title: "Замоскворецкая", color: "rgb(68, 184, 92)"},
            { name: "Россия, Москва, Арбатско-Покровская линия", title: "Арбатско-Покровская", color: "rgb(0, 120, 191)"},
            { name: "Россия, Москва, Филевская линия", title: "Филевская", color: "rgb(25, 193, 243)"},
            { name: "Россия, Москва, Кольцевая линия", title: "Кольцевая", color: "rgb(137, 78, 53)"},
            { name: "Россия, Москва, Калужско-Рижская линия", title: "Калужско-Рижская", color: "rgb(245, 134, 49)"},
            { name: "Россия, Москва, Таганско-Краснопресненская линия", title: "Таганско-Краснопресненская", color: "rgb(142, 71, 156)"},
            { name: "Россия, Москва, Калининская линия", title: "Калининская", color: "rgb(255, 203, 49)"},
            { name: "Россия, Москва, Серпуховско-Тимирязевская линия", title: "Серпуховско-Тимирязевская", color: "rgb(161, 162, 163)"},
            { name: "Россия, Москва, Люблинско-Дмитровская линия", title: "Люблинско-Дмитровская", color: "rgb(179, 212, 69)"},
            { name: "Россия, Москва, Каховская линия", title: "Каховская", color: "rgb(121, 205, 205)"},
            { name: "Россия, Москва, Бутовская линия", title: "Бутовская", color: "rgb(172, 191, 225)"}
        ];

    function findMetroOnMap (coordinates, callback) {
        if (myMap && window.ymaps) {
            ymaps.geocode(coordinates).then(function (res) {
                    myMap.geoObjects.removeAll();
                    var address = res.geoObjects.get(0).geometry.getCoordinates();
                    ymaps.geocode(myMap.getCenter(), {
                        kind: 'metro',
                        results: 1
                    }).then(function (met) {
                        met.geoObjects.options.set('preset', 'islands#redCircleIcon');
                        var metro = met.geoObjects;
                        myMap.geoObjects.add(metro);

                        if (callback != undefined) {
                            callback(met);
                        }
                    });

                    var myPlacemark = new ymaps.Placemark(address);
                    myMap.geoObjects.add(myPlacemark);
                },
                function (err) {
                    console.log("Ошибка yandex maps 1", err);
                });
        } else {
            console.log("myMap && window.ymaps", myMap, window.ymaps)
        }
    }

    function initYMap () {
        var mapID = "map-step-1";
        formWrapper.find(".yandex_map").html("");
        formWrapper.find(".yandex_map").attr("id", mapID);
        formWrapper.find(".yandex_map").css("width", '100%');
        formWrapper.find(".yandex_map").css("height", 347);

        ymaps.geocode('Москва').then(function (res) {
            if (res.geoObjects.get(0) != undefined) {
                coords = res.geoObjects.get(0).geometry.getCoordinates();
                zoom = 13;
            }
            myMap = new ymaps.Map(
                mapID,
                {
                    center: coords,
                    zoom: zoom,
                    type: 'yandex#map',
                    controls: []
                }, {
                    suppressMapOpenBlock: true
                }
            );
            if (res.geoObjects.get(0) != undefined) {
                findMetroOnMap(coords);
            }
        });
    }

    if(window.ymaps == undefined) {
        $.getScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU", function () {
            ymaps.ready(initYMap);
        });
    } else {
        ymaps.ready(initYMap);
    }

    $('.eh-c-control[data-column="venue_address"]').suggestions({
        serviceUrl: "https://dadata.ru/api/v2",
        token: "4c6f9269ee68046587315628da6db92052b4fd10",
        type: "ADDRESS",
        count: 5,
        onSelect: function(suggestion) {
            var geo_lat = suggestion.data.geo_lat,
                geo_lon = suggestion.data.geo_lon;

            if(window.ymaps) {
                coords = [geo_lat, geo_lon];
                myMap.setCenter(coords, 13);
                findMetroOnMap(coords, function(met) {
                    met.geoObjects.each(function (obj) {
                        for (var l in metroLinesCatalog) {
                            if (metroLinesCatalog[l].name == obj.properties.get('description')) {
                                formWrapper.find("div[data-type='DL_METRO_LINE'] .fn-readonly").html(metroLinesCatalog[l].title);
                                formWrapper.find("input[data-column='DL_METRO_LINE']").val(metroLinesCatalog[l].title);
                                formWrapper.find("input[data-column='DL_METRO_LINE']").trigger("input");
                                formWrapper.find(".metro_line_icon").css("border-color", metroLinesCatalog[l].color);
                                break;
                            }
                        }
                        formWrapper.find("div[data-type='DL_METRO_STATION'] .fn-readonly")
                            .html(obj.properties.get('name').replace("метро", "").trim());
                        formWrapper.find("input[data-column='DL_METRO_STATION']")
                            .val(obj.properties.get('name').replace("метро", "").trim());
                        formWrapper.find("input[data-column='DL_METRO_STATION']").trigger("input");
                    });
                } )
            } else {
                console.log("Ошибка yandex maps 2", window.ymaps);
            }

            if(suggestion.data.city != null) {
                formWrapper.find("div[data-type='DL_CITY']").find(".fn-readonly").html(suggestion.data.city);
                formWrapper.find("input[data-column='DL_CITY']").val(suggestion.data.city);
            } else {
                if(suggestion.data.settlement != null) {
                    formWrapper.find("div[data-type='DL_CITY']").find(".fn-readonly").html(suggestion.data.settlement);
                    formWrapper.find("input[data-column='DL_CITY']").val(suggestion.data.settlement);
                } else {
                    if(suggestion.data.area != null) {
                        formWrapper.find("div[data-type='DL_CITY']").find(".fn-readonly").html(suggestion.data.area);
                        formWrapper.find("input[data-column='DL_CITY']").val(suggestion.data.area);
                    }
                }
            }

            formWrapper.find("div[data-type='DL_STREET']").find(".fn-readonly").html(suggestion.data.street_with_type);
            formWrapper.find("div[data-type='DL_BLD']").find(".fn-readonly").html(suggestion.data.house);
            formWrapper.find("div[data-type='DL_KORPUS']").find(".fn-readonly").html(suggestion.data.block);
            formWrapper.find("div[data-type='DL_FLAT']").find(".fn-readonly").html(suggestion.data.flat);

            formWrapper.find("input[data-column='DL_STREET']").val(suggestion.data.street_with_type);
            formWrapper.find("input[data-column='DL_BLD']").val(suggestion.data.house);
            formWrapper.find("input[data-column='DL_KORPUS']").val(suggestion.data.block);
            formWrapper.find("input[data-column='DL_FLAT']").val(suggestion.data.flat);

            formWrapper.find("input[data-column='DL_CITY']").trigger("input");
            formWrapper.find("input[data-column='DL_STREET']").trigger("input");
            formWrapper.find("input[data-column='DL_BLD']").trigger("input");
            formWrapper.find("input[data-column='DL_KORPUS']").trigger("input");
            formWrapper.find("input[data-column='DL_FLAT']").trigger("input");
            formWrapper.find(".address_wrapper input").trigger("input");
        }
    });



    //---






});

