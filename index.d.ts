declare namespace Seneca {
  type Unknown = any;
  type Pattern = string | { [key: string]: any };
  type ActionResponse<T> = (err?: any, msg?: T) => void;
  type AddCallback<T, TResult> = (msg: T, respond?: ActionResponse<TResult>) => void;
  type ActCallback<T> = (err: any, msg: T) => void;

  interface IPlugin<T> {
    (options: T): IPluginOptions | void;
    preload?: (options: T) => IPluginOptions | void;
  }

  interface IPluginOptions {
    name: string;
    export?: any;
    exportmap?: {
      [path: string]: any;
    }
  }

  interface ISeneca  {
    version: string;

    add<T, TResult>(pattern: Unknown, action: AddCallback<T, TResult>): this;
    act<T>(pattern: Pattern, respond: ActCallback<T>): void;
    use<T>(plugin: IPlugin<T>, options?: T): this;
    use<T>(plugin: string, options?: T): this;

    util: {
      deepextend<T, TResult>(object: T, ...sources: any[]): TResult;
    };
  }
}

declare module "seneca" {
  type Unknown = any;

  namespace core {
    type Pattern = Seneca.Pattern;

    interface ISeneca extends Seneca.ISeneca { }
    interface IPlugin<T> extends Seneca.IPlugin<T> { }
    interface IPluginOptions extends Seneca.IPluginOptions { }
  }

  function s(options?: Unknown): core.ISeneca;

  namespace s {
    type Pattern = core.Pattern;

    export interface ISeneca extends core.ISeneca { }
    export interface IPlugin<T> extends core.IPlugin<T> { }
    export interface IPluginOptions extends core.IPluginOptions { }
    export var Seneca: ISeneca;
  }

  export = s;
}