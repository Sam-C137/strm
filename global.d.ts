type Stringified<ObjectType> = string & { source: ObjectType }

declare interface JSON {
    stringify<T>(
        value: T, replacer?: null | undefined, space?: string | number,
    ): Stringified<T>
    parse<T>(
        text: string, reviver?: null | undefined,
    ): JSONStringifiedObject<T>
}

type JSONStringifiedValue<T> = T extends string | number | boolean
    ? T : T extends { toJSON(): infer R } ? R
        : T extends undefined | ((...args: any[]) => any) ? never
            : T extends object ? JSONStringifiedObject<T>
                : never

type JSONStringifiedObject<T> = {
    /**
     * @doc you cannot compare `never` against `never` so we have to use this array syntax
     */
    [Key in keyof T as [JSONStringifiedValue<T[Key]>] extends [never] ? never : Key]: JSONStringifiedValue<T[Key]>
}

declare interface Response {
    json<T = any>(): Promise<T>
}