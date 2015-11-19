$(function() {
    // Global Elements
    var selectedCurrency = $('#user-currency');

    var openBtn  = $('.settings__btn-open'),
        closeBtn = $('.settings__btn-close');

    // Global vars
    var c,
        cur,
        userCurrency;

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
            statusType = $('.status__type'),
            tickerCurrency = currency.toUpperCase();

        // Get selected text and output to Status
        var currencyType = $('#user-currency :selected').text();
        statusType.text(currencyType);

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

    function isRetinaDisplay() {
        if (window.devicePixelRatio > 1 || window.devicePixelRatio === 2) {
            return true;
        } else {
            console.log('Non Retina');
        }
    }

    function saveCurrency() {
        c = selectedCurrency.val();
        cur = c;
        localStorage.setItem('userCurrency', cur);
        getCurrentPrices(cur);
    }

    function getCurrency() {
        if (userCurrency === null || userCurrency < 0) {
            console.log('Creating a new ls obj');
            cur = 'usd';
            selectedCurrency.val(cur);
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

        // Detect if the user has a retina device
        // If the user does then double the circle width and then scale the canvas using css
        var retina = isRetinaDisplay();
        var res;

        if (retina === true) {
            res = 260 * 2;
        } else {
            res = 260;
        }

        progressLoader.circleProgress({
            value: 1.0,
            size: res,
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

        console.log(res);
    }

    function toggleMenu() {
        var menu = $('.settings');
        menu.toggleClass('active');
    }

    // Event Listeners
    closeBtn.click(function() {
        $(this).fadeOut(200);
        openBtn.fadeIn(200).toggleClass('active');
        toggleMenu();
    });

    openBtn.click(function() {
        $(this).fadeOut(300).toggleClass('active');
        closeBtn.fadeIn(200);
        toggleMenu();
    });

    selectedCurrency.change(function() {
        closeBtn.fadeOut(200);
        openBtn.fadeIn(200).toggleClass('active');
        toggleMenu();
        saveCurrency();
    });

    function init() {
        closeBtn.hide();
        isRetinaDisplay();
        getCurrency();
        animateUpdateProgress();
        $('.status').addClass('active');
    }

    init();

    // run getCurrentPrices as specified by the LocalStorage obj
    setInterval(function() {
        getCurrentPrices();
        animateUpdateProgress();
    }, UPDATE_INTERVAL * ONE_SECOND);
});