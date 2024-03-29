<?php
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])){

?>
<html>

<head>
    <meta charset="utf-8">
    <title>Accessible Food Widget</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

    <!-- Import Bootstrap CSS -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">
    <!-- Import MDL libraries -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <!-- Import Mapbox libraries -->
    <script type="text/javascript"
            src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js"></script>
    <link rel="stylesheet" type="text/css"
          href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css">
    <script type="text/javascript" src="https://unpkg.com/ol-mapbox-style@6.1.0/dist/olms.js"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css" rel="stylesheet" />

    <!-- Linking google icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


    <style>
        /* Define any CSS here */
        #map {
            width: 720px;
            height: 820px
        }
    </style>

    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>
        .city {
            display: none
        }
    </style>

    <link rel="stylesheet" href="../map.css">
    <link href="../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css" rel="stylesheet">
    <link href="../node_modules/@fortawesome/fontawesome-free/css/brands.css" rel="stylesheet">
    <link href="../node_modules/@fortawesome/fontawesome-free/css/solid.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../jsforUI.js"></script>
</head>

<body>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <a href="../contact.php" style="float: right; position: absolute; left: 10px; font-style: italic;">Give
                us feedback</a>
            <span class="mdl-layout__title">Accessible Food Widget</span>
            <img src="../images/icon_header.png" alt="image_header" id="iconHeader">
            <a href="logout.php" style="float: right; position: absolute; right: 10px; font-style: italic;">Log
                out</a>
        </div>
    </header>
    <main class="mdl-layout__content">
        <div class="nav-overlay">
        </div>
        <!-- results -->
        <div class="main-left">
            <div class="top">
                <div class="mdl-grid">
                    <div class="mdl-cell mdl-cell--5-col">
                        <!-- Map div -->
                        <div id='map'>
                        </div>
                    </div>
                </div>
                <!-- adding map styles -->
            </div>
            <div id="menu">
                <input id="osm-carto" type="radio" name="rtoggle" value="osm-carto" checked="checked" onclick="changeMapStyle('osm-carto')">
                <label for="osm-carto"><img src="../images/osm-carto.png" alt="osm-carto"
                                            style="max-width: 70px; max-height: 70px;" onclick="changeMapStyle('osm-carto')"></label>
                <input id="osm-bright" type="radio" name="rtoggle" value="osm-bright" onclick="changeMapStyle('osm-bright')">
                <label for="osm-bright"><img src="../images/osm-bright.png" alt="osm-bright"
                                             style="max-width: 70px; max-height: 70px;" onclick="changeMapStyle('osm-bright')"></label>
                <input id="klokantech-basic" type="radio" name="rtoggle" value="klokantech-basic" onclick="changeMapStyle('klokantech-basic')">
                <label for="klokantech-basic"><img src="../images/klokantech-basic.png" alt="klokantech-basic"
                                                   style="max-width: 70px; max-height: 70px;"
                                                   onclick="changeMapStyle('klokantech-basic')"></label>
                <input id="osm-liberty" type="radio" name="rtoggle" value="osm-liberty" onclick="changeMapStyle('osm-liberty')">
                <label for="osm-liberty"><img src="../images/osm-liberty.png" alt="satellite"
                                              style="max-width: 70px; max-height: 70px;" onclick="changeMapStyle('osm-liberty')"></label>
                <input id="toner-grey" type="radio" name="rtoggle" value="satellite-streets" onclick="changeMapStyle('toner-grey')">
                <label for="toner-grey"><img src="../images/toner-grey.png" alt="satellite-streets"
                                             style="max-width: 70px; max-height: 70px;" onclick="changeMapStyle('toner-grey')"></label>
                <input id="positron-blue" type="radio" name="rtoggle" value="positron-blue" onclick="changeMapStyle('positron-blue')">
                <label for="positron-blue"><img src="../images/positron-blue.png" alt="positron-blue"
                                                style="max-width: 70px; max-height: 70px;"
                                                onclick="changeMapStyle('positron-blue')"></label>
                <input id="dark-matter-dark-grey" type="radio" name="rtoggle" value="dark-matter-dark-grey" onclick="changeMapStyle('dark-matter-dark-grey')">
                <label for="dark-matter-dark-grey"><img src="../images/dark-matter-dark-grey.png"
                                                        alt="dark-matter-dark-grey" style="max-width: 70px; max-height: 70px;"
                                                        onclick="changeMapStyle('dark-matter-dark-grey')"></label>
            </div>
            <div class="bottom">
                <div class="mdl-grid">
                    <div id="buttons">
                        <button
                            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            onclick="confirmLocation()" id="buttonConfirm">Confirm Centrepoint</button>
                        <!-- Cancel Location Button -->
                        <button
                            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            onclick="cancelLocation()" id="buttonCancel">X Cancel Centrepoint</button>
                    </div>
                    <button
                        class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                        title="Use Current Location" onclick="getCurrentLocation()" id="currentButton">

                        <i class="material-icons">my_location</i> </button>
                </div>
            </div>
        </div>
        <div class="main-right">
            <span class="mdl-layout-title"><strong>Search nearest Restaurant / Café</strong> </span>
            <br>
            <h7 style="color: crimson;"> <i>Use the text field or pinpoint map to add center point </i> </h7>
            <form action="#">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="addDest">
                    <label class="mdl-textfield__label" for="addDest" id="addDest">Add destination</label>
                    <span id="addDest_msg" class="mdl-textfield__error"></span>

                </div>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                        title="Use Current Location" onclick="searchCenterPoint()">

                    <i class="material-icons">search</i></button>
            </form>
            <div class="searchInfo">
                <img src="../images/menu_icon.jpg" alt="menu_icon" id="menu_icon">
                <select class="form-select" aria-label="Default select example" id="select">
                    <option selected>Open this select menu</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Fast food">Fast Food</option>
                    <option value="Food court">Food Court</option>
                    <option value="Bar">Bar</option>
                    <option value="Pub">Pub</option>
                    <option value="Ice cream">Ice Cream</option>
                    <option value="Coffee">Cafe</option>
                </select>
                <div class="radius">
                    <div class="input-group">
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                               id="radius">
                        <div class="input-group-append">
                            <span class="input-group-text">metres</span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="searchResult">
                <p>
                    <img src="../images/radius-icon.jpg" alt="radius-icon" id="radius-icon">
                    Maximum radius: <span id="demoRadius"></span> metres
                </p>
                <input class="mdl-slider mdl-js-slider" type="range" min="50" max="5000" value="1000" tabindex="0"
                       id="myRadius">
                <p>Number of search result: <span id="demo"></span></p>
                <div class="slidecontainer">
                    <input type="range" min="1" max="500" value="5" class="slider" id="myRange">
                </div>
            </div>
            <br>
            <div class="bookmark">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-success" onclick="setWalk()">Walk</button>
                    <button type="button" class="btn btn-warning" onclick="setBike()">Bike</button>
                    <button type="button" class="btn btn-danger" onclick="setCar()">Car</button>
                </div>
                <div class="w3-container" style="border-radius: 15px;">
                    <button onclick="document.getElementById('id01').style.display='block'"
                            class="w3-button w3-brown" id="w3-button"><b style="color: aliceblue;">Bookmark
                            list</b></button>

                    <div id="id01" class="w3-modal" style="border-radius: 15px;">
                        <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="border-radius:15px;">
                            <header class="w3-container w3-brown"
                                    style="display: flex;  border-radius: 15px 15px 0px 0px;">
                                    <span onclick="document.getElementById('id01').style.display='none'"
                                          class="w3-button w3-brown w3-xlarge w3-display-topright">&times;</span>
                                <div style="font-size: 1.5em; color: Tomato; position:fixed;">
                                    <i class="fas fa-bookmark"></i>
                                </div>
                                <h2 style="color: aliceblue; justify-content: center;"><b>Bookmark List</b></h2>
                            </header>

                            <div class="w3-bar w3-border-bottom" style="background: blanchedalmond;">
                                <button class="tablink w3-bar-item w3-button" onclick="openCity(event, 'Place')">
                                    <h5 style="color: rgb(252, 87, 87);"><b>Place</b></h5>
                                </button>
                                <button class="tablink w3-bar-item w3-button"
                                        onclick="openCity(event, 'Centrepoint')">
                                    <h5 style="color: rgb(252, 87, 87);"><b>Centrepoint</b></h5>
                                </button>
                            </div>

                            <div id="Place" class="w3-container city">
                                <div class="sortBookmark" style="display: flex; flex-flow: row; width:fit-content;">
                                    <p style="text-align:center; margin-top:10px">Sort by: &nbsp; &nbsp; </p>
                                    <select class="form-select" aria-label="Default select example" id="Sortselect"
                                            style="width: 30%;">
                                        <option selected>Open this select menu</option>
                                        <option value="Name">Name</option>
                                        <option value="Address">Address</option>
                                        <option value="Review">Review</option>
                                        <option value="Distance">Distance</option>
                                    </select>
                                    <button class="w3-button w3-right w3-amber w3-border"
                                            style="border-radius: 15px; width: 100px; margin-left: 10px;"
                                            onclick="sortBookMark()">Sort</button>
                                </div>
                                <div id='bookmarkListDisplay'>
                                </div>
                            </div>

                            <div id="Centrepoint" class="w3-container city">
                                <div id='bookmarkCentrepointList'>
                                </div>
                            </div>
                            <div class="w3-container w3-light-grey w3-padding"
                                 style="border-radius: 0px 0px 15px 15px;">
                                <button class="w3-button w3-right w3-white w3-border" style="border-radius: 15px;"
                                        onclick="document.getElementById('id01').style.display='none'">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="buttonList">
                <button class="Button" onclick="searchMap()">
                    <img src="../images/search-icon.png" alt="search_icon" id="search_icon">
                    Start searching!
                </button>
                <button class="Button2" onclick="randomRestaurant()">
                    Choose random place
                </button>
            </div>
        </div>
    </main>
</div>
<script src="../bookmark.js"></script>
<script src="../shared.js"></script>
<script src="../map.js"></script>
<script src="../search.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
        crossorigin="anonymous"></script>
</body>

</html>
    <?php
}else{
    header("Location: ../index.php");
    exit();
}
?>