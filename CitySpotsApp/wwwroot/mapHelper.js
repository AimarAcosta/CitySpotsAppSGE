window.leafletMap = {
    map: null,
    marker: null,
    dotNetHelper: null,

    init: function (mapId, dotNetRef, initialLat, initialLng) {
        this.dotNetHelper = dotNetRef;

        var startLat = (initialLat !== 0) ? initialLat : 43.2627;
        var startLng = (initialLng !== 0) ? initialLng : -2.9253;

        if (this.map !== null) {
            this.map.remove();
        }

        this.map = L.map(mapId).setView([startLat, startLng], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        if (initialLat !== 0 || initialLng !== 0) {
            this.marker = L.marker([initialLat, initialLng]).addTo(this.map);
        }

        this.map.on('click', function (e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;

            if (window.leafletMap.marker) {
                window.leafletMap.marker.setLatLng(e.latlng);
            } else {
                window.leafletMap.marker = L.marker(e.latlng).addTo(window.leafletMap.map);
            }

            window.leafletMap.dotNetHelper.invokeMethodAsync('UpdateCoordinates', lat, lng);
        });
    },

    initGeneralMap: function (mapId, dotNetRef, spots) {
        this.dotNetHelper = dotNetRef;

        if (this.map !== null) {
            this.map.remove();
        }

        this.map = L.map(mapId).setView([43.2627, -2.9253], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        var bounds = [];

        spots.forEach(function (spot) {
            if (spot.lat && spot.lng) {
                var marker = L.marker([spot.lat, spot.lng]).addTo(window.leafletMap.map);
                bounds.push([spot.lat, spot.lng]);

                var popupContent = `
                    <div style="font-family: sans-serif;">
                        <h6 style="margin: 0 0 5px 0; color: #0d6efd;">${spot.name}</h6>
                        <p style="margin: 0; font-size: 12px;"><b>Ciudad:</b> ${spot.city}</p>
                        <p style="margin: 0; font-size: 12px;"><b>Valoración:</b> ${spot.rating} / 5</p>
                        <button class="btn btn-primary btn-sm w-100 mt-2" style="font-size: 11px;" onclick="window.leafletMap.dotNetHelper.invokeMethodAsync('NavigateToDetail', '${spot.id}')">Ver Detalle</button>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });

        if (bounds.length > 0) {
            this.map.fitBounds(bounds);
        }
    }
};