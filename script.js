/* Code goes here */
/* Code goes here */
var jstag;
initialization();

function initialization() {
    setTimeout(function(){ 
        jstag = new Jstag();
        jstag.findAllSmartlinks();
        jstag.runAllSmartlinks();
    }, 100);
}

function smartLink(auctionID, element){
    this.auctionID = auctionID;
    this.element = element;

    this.validAuctionID = function() {
        return /^\d+$/.test(this.auctionID);
    }

    this.runAuction = function() { //promise                 
        /* Every Promise() structure has 2 parts */
        //First Part           
        /* Create the Promise() and define the conditions of what is considered successful and not successful.*/
        return new Promise(function(resolve,reject){
            let auctionInfo = {
                data: {
                  destination_url: 'http://merchant.example/product/1',
                  merchant_name: 'Sephora',
                  product_name: 'Highlighter brush',
                  price: '15.89',
                }
              }
            resolve(auctionInfo)
        });
    }

    this.rewriteLink = function(URL, linkText) {
        this.element.href = URL;
        this.element.innerHTML = linkText;
    }
}

function Jstag() {
    this.smartlinks = [];
    this.findAllSmartlinks = function() {
        var aTags = document.getElementsByTagName("a");
        for (let i = 0; i < aTags.length; i++) {
            let link = aTags[i].href;
            let id = link.substring(link.lastIndexOf("/") + 1);
            let smartlink = new smartLink(id, aTags[i]);
            if (smartlink.validAuctionID() && link.includes("shop-links.co")) {
                this.smartlinks.push(smartlink);
            }
        }
    }
    this.runAllSmartlinks = function() {
        for (let i = 0; i < this.smartlinks.length; i++){
            let smartLink = this.smartlinks[i];
            let promiseToRunAuction = smartLink.runAuction(); 
            promiseToRunAuction.then(function(auctionInfo){
                let url = auctionInfo.data.destination_url;
                let text = auctionInfo.data.product_name + ', $' + auctionInfo.data.price + ' at '+ auctionInfo.data.merchant_name;
                smartLink.rewriteLink(url, text);
            })
        }
    }
    
}

