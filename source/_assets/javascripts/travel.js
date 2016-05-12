(function() {

    var projection = d3.geo.winkel3();


    var map = new Datamap({
        element: document.querySelector('.travel-map'),
        scope: 'world',
        disableDefaultStyles: true,
        setProjection: function(element, options) {

            projection = d3.geo.naturalEarth()
                .scale(240)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2])

            var path = d3.geo.path()
                .projection( projection );

            return {path: path, projection: projection};
        },
        fills: {
            defaultFill: "#F5F5F5",
            beenTo: "#2B2D34",
            home: "#FFA000",
            planned: "#3F51B5"
        },
        geographyConfig: {
            hideAntarctica: true,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            popupOnHover: true,
            highlightOnHover: true,
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 2
        },
        data: {
            DNK: { fillKey: "beenTo" },
            USA: { fillKey: "beenTo" },
            DEU: { fillKey: "beenTo" },
            ITA: { fillKey: "beenTo" },
            FRA: { fillKey: "beenTo" },
            ESP: { fillKey: "beenTo" },
            THA: { fillKey: "beenTo" },
            MYS: { fillKey: "beenTo" },
            QAT: { fillKey: "beenTo" },
            NLD: { fillKey: "beenTo" },
            SWE: { fillKey: "beenTo" },
            NOR: { fillKey: "beenTo" },
            GBR: { fillKey: "beenTo" },
            AUT: { fillKey: "beenTo" },
            ROU: { fillKey: "beenTo" },
            CZE: { fillKey: "beenTo" },
            GRC: { fillKey: "beenTo" },
            VNM: { fillKey: "beenTo" },
            LAO: { fillKey: "beenTo" },
            MMR: { fillKey: "beenTo" },
            IDN: { fillKey: "beenTo" },
            TLS: { fillKey: "beenTo" },
            CHN: { fillKey: "beenTo" },
            KHM: { fillKey: "beenTo" },
            ROU: { fillKey: "beenTo" },
            TWN: { fillKey: "beenTo" },
            JPN: { fillKey: "beenTo" },
            IND: { fillKey: "beenTo" },
            ISL: { fillKey: "beenTo" },
            MEX: { fillKey: "beenTo" },
            CUB: { fillKey: "beenTo" },
            BGR: { fillKey: "beenTo" },
            CHE: { fillKey: "beenTo" },
            BEL: { fillKey: "beenTo" },
            CAN: { fillKey: "home" },
        }
    });

    window.addEventListener('resize', function() {
        var elmMap = document.querySelector('.travel-map > svg');
        var elmContainer = document.querySelector('.travel-map');

        var targetWidth = elmContainer.offsetWidth;
        var aspect = elmMap.offsetWidth / elmMap.offsetHeight;

        d3.select(elmMap).attr('width', targetWidth);
        d3.select(elmMap).attr('height', targetWidth / aspect);

    }, false);

})();
