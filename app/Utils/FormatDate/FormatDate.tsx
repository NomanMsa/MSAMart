import React, { Component } from 'react';
	const FormatDate = {
		formatDate:function (formatDate, formatString) {
			formatDate = new Date(formatDate);
        if(formatDate instanceof Date) {
            var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            var yyyy = formatDate.getFullYear();
            var yy = yyyy.toString().substring(2);
            var m = formatDate.getMonth();
       		 m = parseInt(m)+(1);
            var mm = m < 10 ? "0" + m : m;
            var mmm = months[m];
            var d = formatDate.getDate();
            var dd = d < 10 ? "0" + d : d;
            
            var h = formatDate.getHours();
            var hh = h < 10 ? "0" + h : h;
            var n = formatDate.getMinutes();
            var nn = n < 10 ? "0" + n : n;
            var s = formatDate.getSeconds();
            var ss = s < 10 ? "0" + s : s;
            formatString = formatString.replace(/yyyy/i, yyyy);
            formatString = formatString.replace(/yy/i, yy);
            formatString = formatString.replace(/mmm/i, mmm);
            formatString = formatString.replace(/mm/i, mm);
            formatString = formatString.replace(/m/i, m);
            formatString = formatString.replace(/dd/i, dd);
            formatString = formatString.replace(/d/i, d);
            formatString = formatString.replace(/hh/i, hh);
            formatString = formatString.replace(/h/i, h);
            formatString = formatString.replace(/nn/i, nn);
            formatString = formatString.replace(/n/i, n);
            formatString = formatString.replace(/ss/i, ss);
			formatString = formatString.replace(/s/i, s);
            return formatString;
        } else {
            return "";
        }
	}
}

export default FormatDate;