var bReact = {
    modDelim: '_',
    bevis: false,

    createElement: function(type, config, ...children) {
        if (!config || !config.bElem && !config.bBlock) {
            return React.createElement(type, config, ...children);
        }

        var bemName;
        var bemFullName;

        if (config.bElem) {
            bemName = config.bElem;
        } else if (config.bBlock) {
            bemName = config.bBlock;
        }

        bemFullName = bemName;

        if (config.bMods) {
            var mods = config.bMods;
            var modName;
            var modVal;
            for (modName in mods) {
                if (mods.hasOwnProperty(modName) && mods[modName]) {
                    modVal = mods[modName];
                    bemFullName += ' ' + (!this.bevis ? bemName : '') +
                        this.modDelim + modName +
                        (modVal !== true ? this.modDelim + modVal : '');
                }
            }
        }

        var className = config.className;
        config.className = bemFullName + (className ? ' ' + className : '');

        return React.createElement(type, config, ...children);
    }
};
