(function () {
    var Configuration={
        maxCardLength:22,
        card_is_valid:false,
        validClass:'valid',
        invalidClass:'invalid',
        cartInfo:{}
    }
    function getConfiguration(){
        return Configuration
    }
    function checkType(val){
        let i = [
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
            }],o=[];
        let t;
        for (t = 0; t < i.length; t++){
            let n = i[t];
            const regex = new RegExp(n.pattern);
            if (regex.test(val))
            {
                o.push(n)
            }
        }
        return o;
    }
    function getCardInfo(t){
        var e, n = 22, r = getConfiguration();
        return 1 === t.length && (e = t[0], n = Math.max.apply(null, e.lengths), r.maxCardLength && (n = Math.min(r.maxCardLength, n)), n += e.gaps.length), {
            card: e,
            maxLength: n
        }
    }
    function getccvDate(t) {
        let e, n, r;
        return r = (t = t.replace(/[\/\-\s]/g, "")).charAt(0), 0 === t.length ? e = n = "" : "0" === r || "1" === r ? (e = t.slice(0, 2), n = t.slice(2)) : (e = "0" + r, n = t.slice(1)), {
            month: e,
            year: n
        }
    }

    function _getcaret(input) {
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if(document.selection) {
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
    function _setcaret(input, pos) {
        if (input.setSelectionRange) {
            input.focus()
            input.setSelectionRange(pos,pos)
        } else if(input.createTextRange) {
            var range = input.createTextRange();
            range.move('character', pos);
            range.select();
        }
    }

    function _format_464 (cc) {
        return [cc.substring(0,4),cc.substring(4,10),cc.substring(10,14)].join(' ').trim()
    }
    function _format_465 (cc) {
        return [cc.substring(0,4),cc.substring(4,10),cc.substring(10,15)].join(' ').trim()
    }
    function _format_4444 (cc) {
        return cc?cc.match(/[0-9]{1,4}/g).join(' '):''
    }
    function _format_cardnumber(cc) {
        cc = cc.replace(/[^0-9]+/g,'')
        const type=checkType(cc);
        const cartInfo=getCardInfo(type);
        Configuration.cartInfo=cartInfo;
        if (cartInfo.card!==undefined&&cartInfo.card){
            if (Object.hasOwn(cartInfo.card,'lengths'))
            for (let i = 0; i < cartInfo.card.lengths.length; i++) {
                if (cc.length===cartInfo.card.lengths[i]){
                    Configuration.card_is_valid=true;
                    break;
                }else{
                    Configuration.card_is_valid=false;
                }
            }
            return cartInfo.card.format(cc)
        }
        cc = cc.substring(0,22)
        return _format_4444(cc)
    }

    function _set_creditcard_number(event) {
        const input = event.target
        const maxlength = input.getAttribute('maxlength')

        var oldval = input.value

        var caret_position = _getcaret(input)
        var before_caret = oldval.substring(0,caret_position)
        before_caret = _format_cardnumber(before_caret)
        caret_position = before_caret.length

        var newvalue = _format_cardnumber(oldval)
        if (Configuration.card_is_valid){
            event.target.classList.add(Configuration.validClass);
            event.target.classList.remove(Configuration.invalidClass);
        }else{
            event.target.classList.remove(Configuration.validClass);
            event.target.classList.add(Configuration.invalidClass);
        }
        if(oldval==newvalue) return

        input.value = newvalue
        _setcaret(input, caret_position)
    }
    function _setCvv(event) {
        event.target.value = event.target.value.replace(/[^0-9]+/g,'')
        const input = event.target
        let val = input.value


        event.target.classList.remove(Configuration.validClass);
        event.target.classList.add(Configuration.invalidClass);

        if (Configuration.cartInfo.card!==undefined){
            if (Configuration.card_is_valid){
            if (val.length===Configuration.cartInfo.card.code.size){
                    event.target.classList.add(Configuration.validClass);
                    event.target.classList.remove(Configuration.invalidClass);
                    return;
                }else{
                return;
            }
            }
        }
        if (val.length===3){
            event.target.classList.add(Configuration.validClass);
            event.target.classList.remove(Configuration.invalidClass);
            return;
        }
    }
    function _setExpiration(event) {
        const input = event.target
        let val = event.target.value

        event.target.classList.remove(Configuration.validClass);
        event.target.classList.add(Configuration.invalidClass);

        const Expiration=getccvDate(val);
        const d = new Date();
        const fullYear = d.getFullYear();
        const fullYearstr = String(d.getFullYear());
        const Year = parseInt(fullYearstr.slice(-2));
        const Month=d.getMonth();
        const dataYear=parseInt(Expiration.year);
        const datamonth=parseInt(Expiration.month);
        if (dataYear>=fullYear){
            if (fullYear===dataYear){
                if (datamonth>=Month){
                    event.target.classList.add(Configuration.validClass);
                    event.target.classList.remove(Configuration.invalidClass);
                }
            }else if(dataYear>fullYear){
                if (datamonth<=12){
                    event.target.classList.add(Configuration.validClass);
                    event.target.classList.remove(Configuration.invalidClass);
                }
            }
        }else if (dataYear>=Year&&Expiration.year.length==2){
            if (Year===dataYear){
                if (datamonth>=Month){
                    event.target.classList.add(Configuration.validClass);
                    event.target.classList.remove(Configuration.invalidClass);
                }
            }else if(dataYear>Year){
                if (datamonth<=12){
                    event.target.classList.add(Configuration.validClass);
                    event.target.classList.remove(Configuration.invalidClass);
                }
            }
        }
        if (val.length>2){
            event.target.value=Expiration.month+'/'+Expiration.year
        }else{
            event.target.value = event.target.value.replace(/[^0-9]+/g,'')
        }

        return;
    }

    function make_credit_card_input(input) {
        input.addEventListener('input',_set_creditcard_number)
        input.addEventListener('keyup',_set_creditcard_number)
        input.addEventListener('keydown',_set_creditcard_number)
        input.addEventListener('keypress',_set_creditcard_number)
        input.addEventListener('change',_set_creditcard_number)
    }
    function make_cvv_input(input) {
        input.addEventListener('input',_setCvv)
        input.addEventListener('keyup',_setCvv)
        input.addEventListener('keydown',_setCvv)
        input.addEventListener('keypress',_setCvv)
        input.addEventListener('change',_setCvv)
    }
    function make_expiration_input(input) {
        input.addEventListener('input',_setExpiration)
        input.addEventListener('keyup',_setExpiration)
        input.addEventListener('keydown',_setExpiration)
        input.addEventListener('keypress',_setExpiration)
        input.addEventListener('change',_setExpiration)
    }
    const credit=document.getElementById('credit-card-number');
    const cvv=document.getElementById('cvv');
    const expiration=document.getElementById('expiration');
    make_credit_card_input(credit);
    make_cvv_input(cvv);
    make_expiration_input(expiration);
    // window.credit_card_input = make_credit_card_input
})()