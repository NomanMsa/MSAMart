import React, { Component } from 'react';
const Calc = {
    countDown: function(fromDt, toDt){
		let d = toDt - fromDt;
		let days         = Math.floor(d/1000/60/60/24);
		let hours        = Math.floor(d/1000/60/60    - days*24);
		let minutes      = Math.floor(d/1000/60       - days*24*60         - hours*60);
		let seconds      = Math.floor(d/1000          - days*24*60*60      - hours*60*60      - minutes*60);
		let milliseconds = Math.floor(d               - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
		if(days < 10){days = '0' + days}
		if(hours < 10){hours = '0' + hours}
		if(minutes < 10){minutes = '0' + minutes}
		if(seconds < 10){seconds = '0' + seconds}
		if(milliseconds < 10){milliseconds = '0' + milliseconds}
		return { days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds}
    },
}

export default Calc;