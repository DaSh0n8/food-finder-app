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
            height: 720px
        }
    </style>
    <link rel="stylesheet" href="../map.css">
    <link href="./node_modules/@fortawesome/fontawesome-free/css/fontawesome.css" rel="stylesheet">
    <link href="./node_modules/@fortawesome/fontawesome-free/css/brands.css" rel="stylesheet">
    <link href="./node_modules/@fortawesome/fontawesome-free/css/solid.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../jsforUI.js"></script>
</head>

<body>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <span class="mdl-layout__title">Accessible Food Widget</span>
            <a href="logout.php">Logout</a>
            <img src="../images/icon_header.png" alt="image_header" id="iconHeader">
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

                    <div class="mdl-cell mdl-cell--5-col">
                        <!-- Confirm Location Button -->
                    </div>


                    <div class="mdl-cell mdl-cell--2-col">
                        <!-- Colored mini FAB button -->
                        <button
                            class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                            title="Use Current Location" onclick="getCurrentLocation()">

                            <i class="material-icons">my_location</i></button>

                    </div>

                </div>
                <!-- adding map styles -->
            </div>
            <div id="menu">
                <input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked">
                <label for="streets-v11"><img src="../images/streets.JPG" alt="streets" style="max-width: 70px; max-height: 70px;"></label>
                <input id="light-v10" type="radio" name="rtoggle" value="light">
                <label for="light-v10"><img src="../images/light.JPG" alt="light" style="max-width: 70px; max-height: 70px;"></label>
                <input id="dark-v10" type="radio" name="rtoggle" value="dark">
                <label for="dark-v10"><img src="../images/dark.JPG" alt="dark" style="max-width: 70px; max-height: 70px;"></label>
                <input id="satellite-v9" type="radio" name="rtoggle" value="satellite">
                <label for="satellite-v9"><img src="../images/satellite.JPG" alt="satellite" style="max-width: 70px; max-height: 70px;"></label>
                <input id="satellite-streets-v11" type="radio" name="rtoggle" value="satellite-streets">
                <label for="satellite-streets-v11"><img src="../images/satellite-streets.JPG" alt="satellite-streets" style="max-width: 70px; max-height: 70px;"></label>
                <input id="navigation-day-v1" type="radio" name="rtoggle" value="navigation-day">
                <label for="navigation-day-v1"><img src="../images/navigation-day.JPG" alt="navigation-day" style="max-width: 70px; max-height: 70px;"></label>
                <input id="navigation-night-v1" type="radio" name="rtoggle" value="navigation-night">
                <label for="navigation-night-v1"><img src="../images/navigation-night.JPG" alt="navigation-night" style="max-width: 70px; max-height: 70px;"></label>
            </div>
            <div class="bottom">

                <div class="mdl-grid" id="buttons">
                    <div class="button-left">
                        <div class="mdl-cell mdl-cell--4-col">
                            <!-- Confirm Location Button -->
                            <button
                                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                onclick="confirmLocation()">Confirm Centrepoint</button>
                        </div>
                    </div>
                    <div class="button-right">
                        <div class="mdl-cell mdl-cell--4-col">
                            <!-- Cancel Location Button -->
                            <button
                                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                onclick="cancelLocation()">Cancel Centrepoint</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="font-size: 1.5em; color: Tomato;" id='bookmarkCentrepointList'>
                <i class="fas fa-bookmark"></i>
            </div>
        </div>
        <div class="main-right">
            <br>
            <span class="mdl-layout-title"><strong>Search nearest Restaurant / Café</strong> </span>
            <br>
            <h7 style="color: crimson;"> <i>Use the text field or pinpoint map to add center point </i> </h7>
            <form action="#">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="addDest">
                    <label class="mdl-textfield__label" for="addDest" id="addDest">Add destination</label>
                    <span id="addDest_msg" class="mdl-textfield__error"></span>

                </div>
                <button
                    class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
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
                    Maximum radius: <span id="demoRadius"></span>
                </p>
                <input class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="25" tabindex="0"
                       id="myRadius">
                <p>Number of search result: <span id="demo"></span></p>
                <div class="slidecontainer">
                    <input type="range" min="1" max="500" value="5" class="slider" id="myRange">
                </div>
            </div>
            <br>
            <br>
            <p>Travel vehicle:</p>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-success" onclick="setWalk()">Walk</button>
                <button type="button" class="btn btn-warning" onclick="setBike()">Bike</button>
                <button type="button" class="btn btn-danger" onclick="setCar()">Car</button>
            </div>
            <br>
            <br>
            <button class="Button" onclick="searchMap()">
                <img src="../images/search-icon.png" alt="search_icon" id="search_icon">
                Start searching!
            </button>
            <br>
            <br>
            <a href="../contact.php">Give us feedback</a>
            <!-- <div style="font-size: 1.5em; color: Tomato;" id='bookmarkList'>
                <i class="fas fa-bookmark"></i>
            </div> -->
        </div>
    </main>
</div>
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