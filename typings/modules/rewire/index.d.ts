// Generated by typings
// Source: https://raw.githubusercontent.com/cantide5ga/typed-rewire/969d1d67df09f03b460406d6db271bb6e1452f62/index.d.ts
declare module 'rewire' {
namespace rewire {
    interface Rewire {
        __get__(fn: string): any;
        __set__(variable: string, mock: any): () => void;
        __set__(variables: { [variable: string]: any }): () => void;
        __with__(variables: { [variable: string]: any }): (cb: () => any) => any;
    }
}

function rewire<T>(file: string): T & rewire.Rewire;

export = rewire;
}