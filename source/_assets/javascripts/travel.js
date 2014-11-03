


        var map = new Datamap({
            element: document.querySelector('.travel-map'),
            scope: 'world',
            setProjection: function(element, options) {
                var projection = d3.geo.winkel3()
                .scale(180)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2])
                .precision(.1);

                path = d3.geo.path()
                    .projection( projection );

                return {path: path, projection: projection};
            },
            fills: {
                defaultFill: "#F5F5F5",
                beenTo: "#2B2D34"
            },
            geographyConfig: {
                hideAntarctica: true,
                borderWidth: 1,
                borderColor: '#CCCCCC',
                popupOnHover: false,
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
            }            
        });