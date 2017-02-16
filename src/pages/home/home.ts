import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {}

  launch() {
    let url = 'https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&key=test_key&env=tartan&product=connect&selectAccount=true&clientName=test&webhook=http://requestb.in/qm1rc4qm'
      let browser = new InAppBrowser(url, '_blank', 'location=yes' )

    browser.on('loadstop').subscribe(function(event) {
      console.log("subscribed", event.url);
      browser.show();
    });

    browser.on('loaderror').subscribe(function(event) {
      let split_url = event.url.split('?')
      if(split_url[0] === 'plaidlink://connected'){
        buildParamObject(event.url)
        browser.close()
      }
    });
  }
}

function buildParamObject(url){
  let url_obj = {}
  let split_url = url.split('?');
  let query_params = split_url[1];
  let query_array = query_params.split('&')
  query_array.forEach((item) => {
    let temp = item.split('=');
    url_obj[temp[0]] = temp[1]
  });

  return url_obj
}

