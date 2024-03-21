# credit-card-form
Credi cart format , mask input and validator. Vanilla js.
## DEMO

[Try it]([https://braintree.github.io/restricted-input/](https://rawcdn.githack.com/begench993/credit-card-form/main/index.html)).

## Features

- Disallow arbitrary characters based on patterns
- Maintains caret position
- Format/Update on paste
- Works in IE11+

## Cart Types

```
[
            {
                niceType: "Visa",
                type: "visa",
                pattern: "^4\\d*$",
                gaps: [4, 8, 12],
                lengths: [16],
                format: _format_4444,
                code: {name: "CVV", size: 3}
            }, {
                niceType: "MasterCard",
                type: "master-card",
                pattern: "^(5|5[1-5]\\d*|2|22|222|222[1-9]\\d*|2[3-6]\\d*|27[0-1]\\d*|2720\\d*)$",
                gaps: [4, 8, 12],
                lengths: [16],
                format: _format_4444,
                code: {name: "CVC", size: 3}
            }, {
                niceType: "American Express",
                type: "american-express",
                pattern: "^3([47]\\d*)?$",
                isAmex: !0,
                gaps: [4, 10],
                lengths: [15],
                format: _format_465,
                code: {name: "CID", size: 4}
            }, {
                niceType: "Diners Club",
                type: "diners-club",
                pattern: "^3((0([0-5]\\d*)?)|[689]\\d*)?$",
                gaps: [4, 10],
                lengths: [14],
                format: _format_464,
                code: {name: "CVV", size: 3}
            }, {
                niceType: "Discover",
                type: "discover",
                pattern: "^6(0|01|011\\d*|5\\d*|4|4[4-9]\\d*)?$",
                gaps: [4, 8, 12],
                lengths: [16, 19],
                format: _format_4444,
                code: {name: "CID", size: 3}
            }, {
                niceType: "JCB",
                type: "jcb",
                pattern: "^((2|21|213|2131\\d*)|(1|18|180|1800\\d*)|(3|35\\d*))$",
                gaps: [4, 8, 12],
                lengths: [16],
                format: _format_4444,
                code: {name: "CVV", size: 3}
            }, {
                niceType: "UnionPay",
                type: "unionpay",
                pattern: "^6(2\\d*)?$",
                gaps: [4, 8, 12],
                lengths: [16, 17, 18, 19],
                format: _format_4444,
                code: {name: "CVN", size: 3}
            }, {
                niceType: "Maestro",
                type: "maestro",
                pattern: "^((5((0|[6-9])\\d*)?)|(6|6[37]\\d*))$",
                gaps: [4, 8, 12],
                lengths: [12, 13, 14, 15, 16, 17, 18, 19],
                format: _format_4444,
                code: {name: "CVC", size: 3}
            }]
```
