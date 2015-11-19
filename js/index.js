$(function() {
    // Global Elements
    selectedCurrency = $('#user-currency');

    var settingsBtn = $('.settings__btn'),
        saveBtn     = $('.settings__btn-save');

    // Global vars
    var c, cur, curLower, userCurrency;

    userCurrency = localStorage.getItem('userCurrency');

    // conts
    var ONE_SECOND      = 1000,
        UPDATE_INTERVAL = 15;

    // Currency
    var currencySymbols = {
        aud: '$',
        brl: 'R$',
        cad: '$',
        cny: '¥',
        eur: '€',
        gbp: '£',
        hkd: 'HK$',
        idr: 'Rp',
        ils: '₪',
        jpy: '¥',
        mxn: '$',
        nok: 'kr',
        nzd: '$',
        pln: 'zł',
        ron: 'L',
        rub: '₽',
        sek: 'kr',
        sgd: 'S$',
        usd: '$',
        zar: 'Z'
    };

    // get prices
    function getCurrentPrices(currency) {
        var statusPrice = $('.status__price'),
            tickerCurrency = cur.toUpperCase();

        $.getJSON('https://api.bitcoinaverage.com/ticker/' + tickerCurrency + '/', function(data) {
            // console.log(data);
            var curLower = cur.toLowerCase();
            if (typeof curLower === 'undefined') {
                console.log('Erroring!');
            } else if (curLower === 'aud') {
                statusPrice.html(currencySymbols.aud + data.last);
            } else if (curLower === 'brl') {
                statusPrice.html(currencySymbols.brl + data.last);
            } else if (curLower === 'cad') {
                statusPrice.html(currencySymbols.cad + data.last);
            } else if (curLower === 'cny') {
                statusPrice.html(currencySymbols.cny + data.last);
            } else if (curLower === 'eur') {
                statusPrice.html(currencySymbols.eur + data.last);
            } else if (curLower === 'gbp') {
                statusPrice.html(currencySymbols.gbp + data.last);
            } else if (curLower === 'hkd') {
                statusPrice.html(currencySymbols.hkd + data.last);
            } else if (curLower === 'idr') {
                statusPrice.html(currencySymbols.idr + data.last);
            } else if (curLower === 'ils') {
                statusPrice.html(currencySymbols.ils + data.last);
            } else if (curLower === 'jpy') {
                statusPrice.html(currencySymbols.jpy + data.last);
            } else if (curLower === 'mxn') {
                statusPrice.html(currencySymbols.mxn + data.last);
            } else if (curLower === 'nok') {
                statusPrice.html(currencySymbols.nok + data.last);
            } else if (curLower === 'nzd') {
                statusPrice.html(currencySymbols.nzd + data.last);
            } else if (curLower === 'pln') {
                statusPrice.html(currencySymbols.pln + data.last);
            } else if (curLower === 'ron') {
                statusPrice.html(currencySymbols.ron + data.last);
            } else if (curLower === 'rub') {
                statusPrice.html(currencySymbols.rub + data.last);
            } else if (curLower === 'sek') {
                statusPrice.html(currencySymbols.sek + data.last);
            } else if (curLower === 'sgd') {
                statusPrice.html(currencySymbols.sgd + data.last);
            } else if (curLower === 'usd') {
                statusPrice.html(currencySymbols.usd + data.last);
            } else if (curLower === 'zar') {
                statusPrice.html(currencySymbols.zar + data.last);
            }
        });
    }

    function saveCurrency() {
        c = selectedCurrency.val();
        cur = c;
        localStorage.setItem('userCurrency', cur);
        getCurrentPrices(cur)
        toggleMenu();
    }

    function getCurrency() {
        if (userCurrency === null || userCurrency < 0) {
            cur = 'usd';
            localStorage.setItem('userCurrency', cur);
            getCurrentPrices(cur);
        } else {
            cur = userCurrency;
            selectedCurrency.val(cur);
            getCurrentPrices(cur);
        }
    }

    function animateUpdateProgress() {
        var progressLoader = $('.loader');

        progressLoader.circleProgress({
            value: 1.0,
            size: 260,
            thickness: 4,
            lineCap: 'round',
            emptyFill: 'rgba(255, 255, 255, 0.05)',
            fill: {
                gradient: ['#5BD8E4', '#0099FF']
            },
            animation: {
                duration: UPDATE_INTERVAL * ONE_SECOND
            },
            animationStartValue: 0.0
        });
    }

    function toggleMenu() {
        var menu = $('.settings');
        menu.toggleClass('active');
        saveBtn.hide();
    }

    user = JSON.parse(localStorage.getItem('user'));

    // run onload
    getCurrency();
    animateUpdateProgress();
    getCurrentPrices();

    $('.clear-local').click(function() {
        localStorage.clear();
    });

    settingsBtn.click(function() {
        $(this).toggleClass('active');
        toggleMenu();
    });

    selectedCurrency.change(function() {
        saveCurrency();
    });

    $('.status').addClass('active');

    // run getCurrentPrices as specified by the LocalStorage obj
    setInterval(function() {
        getCurrentPrices();
        animateUpdateProgress();
    }, UPDATE_INTERVAL * ONE_SECOND);
});