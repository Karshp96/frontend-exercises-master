# Narrativ widget exercise

### Instructions
- Clone this repo. Please write your code in `script.js`. You are encouraged to use ES6.

- In this directory, run: `$ python -m SimpleHTTPServer`. Open localhost:8000 to preview `index.html`. Remember to refresh the page after updating the code.

- To submit, please push the repo to your Github and notify us.

### Exercise prompt
1. Write a constructor function named Smartlink that is initialized with 2 parameters:
  a) An auction ID in string form;
  b) A DOM element.
Assign this DOM element to Smartlink `element` attribute.

2. Smartlink has a method `validAuctionId()` that validates that the auction ID is a valid integer and returns a bool.
```
// Valid
'1235265680'
'97627'

// Invalid
'abcd'
'123abc'
```

3. Smartlink has a `runAuction()` method that returns a promise that resolves with:
```Javascript
{
  data: {
    destination_url: 'http://merchant.example/product/1',
    merchant_name: 'Sephora',
    product_name: 'Highlighter brush',
    price: '15.89',
  }
}
```

4. Smartlink has a `rewriteLink(URL, linkText)` method, which takes two strings as parameters. It updates the href and text of its element with these new values.

5. Write a constructor function named Jstag. It has a function called `findAllSmartlinks()` that is called on initialization.

6. `findAllSmartlinks()` finds all the Smartlink elements on the page, which are anchor elements with hrefs in the form of `https://shop-links.co/123456789`, where `123456789` is the auction ID (hint: utilize Smartlink's validAuctionId function). Save the valid Smartlinks in an array `this.smartlinks`.
```Javascript
// Valid links
'https://shop-links.co/98776543210'
'//shop-links.co/9877654321'
'shop-links.co/9877654323'

// Invalid
'https://shop-links.co/123invalid'
'shop-links.us/98776543210'
```

7. Jstag has a method called `runAllSmartlinks()`. It loops through the smartlinks array and call `runAuction()` on each Smartlink. Then call `rewriteLink()` using the data returned by `runAuction()` to update the Smartlink element.
  - Smartlink href => destination URL
  - Smartlink text => "Product Name, $Price at Merchant Name".

8. Don't rewrite the Smartlink if the auction ID isn't valid. To verify that your code is working, check that "SMARTLINK 1" and "SMARTLINK 2" are overwritten with "Highlighter brush, $15.89 at Sephora". "INVALID SMARTLINK" and "RANDOM LINK" should not be updated.
