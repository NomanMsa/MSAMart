
// import Emarsys from "react-native-emarsys-wrapper";

const eventFunctions = {
    trackEmarsys: async function(tagName, attributes){
        try {
            let result = "";//await Emarsys.predict.trackTag(tagName, attributes);
        } catch (e) {
            console.log(e);
        }
    }
}

export default eventFunctions;