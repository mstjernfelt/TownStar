// ==UserScript==
// @name         Production Rate Monitor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Monitor production rate of specified craft items.
// @author       Groove
// @match        https://townstar.sandbox-games.com/launch
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const trackedItems = [
        // Pinot Noir production monitor
        {item: 'Wood', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '24496903/1/icon_wood.png?t=5813663b26908d759b293a10d5557cca'},
        {item: 'Lumber', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '24496963/1/icon_lumber.png?t=3821bb767168e17ed77fa8fb6429e96a'},
        {item: 'Chromium', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '43726739/1/icon_chromium.png?t=bc91ea3d6a7913438fa6ae66a5cad598'},
        {item: 'Limestone', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726737/1/icon_limestone.png?t=01fa2771cbf79e1954ccb83914497d53'},
        {item: 'Wine_Bottle', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '43726743/1/icon_wineBottle.png?t=04041ab6c35dc173822c370af9467f49'},
        {item: 'Pinot_Noir_Grapes', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '43726741/1/icon_pinotNoirGrapes.png?t=cd70f710d9ffa9e3079b444344ee43fb'},
        {item: 'Pinot_Noir', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '43726740/1/icon_pinotNoir.png?t=c48e5f006b84f8ac995d588403126737'},
        {item: 'Oak_Wood', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726736/1/icon_oakWood.png?t=6fb2a970d4fce8f8ff913cba5734e6f1'},
        {item: 'Oak_Barrel', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726738/1/icon_oakBarrel.png?t=4a61c81bbdd998c733a5ebc74fed372d'},
        {item: 'Silica', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '43726742/1/icon_silica.png?t=32700ede2d2144dab72fd17a274484d6'},
        //{item: 'Milk', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '24496962/1/icon_milk.png?t=bf243cea5c9cdc7457d693b50a1adfd1'},
        //{item: 'Yarn', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496900/1/icon_yarn.png?t=40ca00c8293fe3c12489901c58e00dad'},
        //{item: 'Eggs', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496927/1/icon_eggs.png?t=bf433510dcec27001157733569809d53'},
        //{item: 'Cotton', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496930/1/icon_cotton.png?t=88c43d55100a3af0aae808b337e70a6f'},
        //{item: 'Wool', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496950/1/icon_wool.png?t=70a6c832dbf65cc405378ad00a0fbac9'},
        //{item: 'Wheat', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496952/1/icon_wheat.png?t=98cdc630e5951ef3f4b7cab7e504e6ad'},
        //{item: 'Sugar', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496954/1/icon_sugar.png?t=f9a32fe1e00c61e73a7437ec68bcd9a4'},
        //{item: 'Steel', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496955/1/icon_steel.png?t=633c24af6182ecb6a1a857e4873f86aa'},
        //{item: 'Salt', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496956/1/icon_salt.png?t=966ccd519247d3d9303b8b6dd003b070'},
        //{item: 'Sugarecane', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496957/1/icon_sugarcane.png?t=51aeb4a0643ee5aca60b4fcbe4e2b2cb'},
        //{item: 'Uniforms', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496958/1/icon_uniforms.png?t=c3758c33624d5e93f69598d848c1f222'},
        //{item: 'Petroleum', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496959/1/icon_petroleum.png?t=a4473cadfc09d4f0672e009303509b1f'},
        //{item: 'Jet_Fuel', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496964/1/icon_jetFuel.png?t=bbeb4de39f03aba76d960a96ee8599f6'},
        //{item: 'Gasoline', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496966/1/icon_gasoline.png?t=a231669433ff6cc683e15871404c8f05'},
        //{item: 'Flour', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496968/1/icon_flour.png?t=54b202363da43d50e30fdf511b571609'},
        //{item: 'Feed', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496969/1/icon_feed.png?t=cee83bd2adbf464528860abd32601847'},
        //{item: 'Dough', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496972/1/icon_dough.png?t=a69233c027a3d6ebfefdb1ff759d866c'},
        //{item: 'Crued_Oil', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496975/1/icon_crudeOil.png?t=b8613c6cd6f16ef2e09f117cb8e72d55'},
        //{item: 'Cotton_Yarn', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496977/1/icon_cottonYarn.png?t=536a340e113734fd820d78ba4dc9d1ba'},
        //{item: 'Brine', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496979/1/icon_brine.png?t=b3c42c4a37547d53e25b0bd4a4706e36'},
        //{item: 'Butter', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496980/1/icon_butter.png?t=85cb1cdd97b555153961015587cb11ae'},
        //{item: 'Bread', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496982/1/icon_bread.png?t=eae581e650676b6f48df84ea3de055ef'},
        //{item: 'Cake', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496983/1/icon_cake.png?t=1691034adb80686649e28684bb2e6cf1'},
        //{item: 'Blue_Steel', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496984/1/icon_blueSteel.png?t=0d58012fad449746318c356986708750'},
        //{item: 'Batter', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496985/1/icon_batter.png?t=714a371fa955fef84f9d372fb5f09e25'},
        //{item: 'Baguette', count:0, first: 0, oneMin: 0, oneHour: 0, image: '24496986/1/icon_baguette.png?t=37cd3e325e708883a4acc6b75c1d0625'},
        //{item: 'Pumpkin', count:0, first: 0, oneMin: 0, oneHour: 0, image: '36897915/1/icon_Pumpkin.png?t=c0af83e4e234482d619f70bb536941b1'},
        //{item: 'Pumpkin_Pie', count:0, first: 0, oneMin: 0, oneHour: 0, image: '37126455/1/icon_pumpkinPie.png?t=6d2b3f6730dd7eb844f5fe188c2d43ea'},
        //{item: 'Cabernet_Vines', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726665/1/icon_cabernetVines.png?t=ca0a03dbe8518f1f25b1a16b612d967d'},
        //{item: 'Chardonnay_Vines', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726666/1/icon_chardonnayVines.png?t=325371772eb9fa2e63341e933821a7c1'},
        //{item: 'Cabernet_Sauvignon', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726732/1/icon_cabernetSauvignon.png?t=0502b79a4793abb9a0be172655eccc8d'},
        //{item: 'Caberet_Grapes', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726733/1/icon_cabernetGrapes.png?t=d8d158a2287c083ecb38dd7cf85c0a29'},
        //{item: 'Chardonnay', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726734/1/icon_chardonnay.png?t=6d854a703d00942cef9eb62b42d6a15a'},
        //{item: 'Chardonnay_Grapes', count:0, first: 0, oneMin: 0, oneHour: 0, image: '43726735/1/icon_chardonnayGrapes.png?t=8dba9a4bc01f8f48c1a1bdba262801bd'},
        {item: 'Water_Drum', count: 0, first: 0, oneMin: 0, oneHour: 0, image: '24496953/1/icon_water.png?t=f7dfc58adc3d81b7b2d6efdc11bb71c2'}
    ];
    let loaded = 0;
    let startDateTime = Date.now();

    new MutationObserver(function(mutations) {
        if (document.querySelector('.hud .right .hud-right') && loaded == 0) {
            loaded = 1;
            LoadProductionMonitor();
        }
    }).observe(document, {childList: true, subtree: true});

    function LoadProductionMonitor() {
        let trackedHud = document.createElement('div');
        trackedHud.id = 'tracked-items';
        let trackedItemHeader = document.createElement('div');
        trackedItemHeader.id = 'tracked-item-header';
        trackedItemHeader.classList.add('bank');
        trackedItemHeader.style = 'width: 75%;';
        trackedItemHeader.innerHTML = 'Session:&nbsp;' + GetDuration(startDateTime);
        trackedHud.appendChild(trackedItemHeader);
        let hudRight = document.querySelector('.hud .right .hud-right');
        hudRight.insertBefore(trackedHud, hudRight.querySelector('.right-hud').nextSibling);

        for (let item of trackedItems) {
            let trackedItemElem = document.createElement('div');
            trackedItemElem.id = 'tracked-item-' + item.item;
            trackedItemElem.classList.add('bank', 'contextual');
            trackedItemElem.style = 'width: 75%;';
            //trackedItemElem.innerHTML = '<input type="checkbox" id="Sell-' + item.item + '" name="Sell-' + item.item + '" checked><img src=' + item.image + '</img>&nbsp;Count&nbsp;|&nbsp;&nbsp;|&nbsp;';
            trackedItemElem.innerHTML = '<img src=https://townstar.sandbox-games.com/files/assets/' + item.image + '</img>';
            trackedHud.appendChild(trackedItemElem);
        }

        class TrackUnitDeliverOutputTask extends UnitDeliverOutputTask {
            onArrive() {
                super.onArrive();
                let trackedItem = trackedItems.find(item => item.item.toUpperCase() == this.craft.toUpperCase())
                if (trackedItem) {
                    trackedItem.count++;
                    if (trackedItem.count == 1) {
                        trackedItem.first = Date.now();
                    } else {
                        let timeDiff = Date.now() - trackedItem.first;
                        trackedItem.oneMin = 60 / (trackedItem.count / (timeDiff / 60000))
                        trackedItem.oneHour = trackedItem.count / (timeDiff / 3600000)
                    }
                    document.getElementById('tracked-item-' + trackedItem.item).innerHTML = '<img src=https://townstar.sandbox-games.com/files/assets/' + trackedItem.image + '</img>&nbsp;&nbsp;<b>' + trackedItem.count + '</b>&nbsp;|&nbsp;<b>' + trackedItem.oneMin.toFixed(1) + '</b>&nbsp;|&nbsp;<b>' + trackedItem.oneHour.toFixed(0) + '</b>';
                }

                document.getElementById('tracked-item-header').innerHTML = 'Session:&nbsp;' + GetDuration(startDateTime);
            }
        }

        let origfindDeliverOutputTask = TS_UnitLogic.prototype.findDeliverOutputTask;
        TS_UnitLogic.prototype.findDeliverOutputTask = function(t) {
            let origReturn = origfindDeliverOutputTask.call(this, t);
            return origReturn ? new TrackUnitDeliverOutputTask(origReturn.unit,origReturn.targetObject,t) : null
        }
    }

    function GetDuration(dateTime) {
        var timeDiff = new Date(Date.now() - dateTime);
        var duration = timeDiff.toUTCString().split(" ")[4];

        return duration;
    }
})();