import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./attributes/color'),
    PLATFORM.moduleName('./value-converters/upcase'),
    PLATFORM.moduleName('./binding-behaviors/primary-click'),
    PLATFORM.moduleName('./elements/hello-world')
  ]);
}
