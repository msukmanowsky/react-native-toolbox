interface RandomUser {
    gender: Gender;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number | string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: string;
    };
    registered: {
        date: string;
        age: string;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: Nationality;
}
declare type Gender = "male" | "female" | "any";
declare type Nationality = "AU" | "BR" | "CA" | "CH" | "DE" | "DK" | "ES" | "FI" | "FR" | "GB" | "IE" | "IR" | "NO" | "NL" | "NZ" | "TR" | "US";
interface RandomUserOptions {
    apiVersion?: string;
    format?: "json" | "pretty" | "csv" | "yaml" | "xml";
    gender?: Gender;
    nationalities?: Nationality[];
    passwords?: string;
    results?: number;
    seed?: string;
}
/**
 * Get random users from the https://randomuser.me API.
 *
 * ```typescript
 * const users = useRandomUsers();
 * ```
 * @param options See https://randomuser.me/documentation
 */
declare const useRandomUsers: (options: RandomUserOptions) => RandomUser[];
export default useRandomUsers;
//# sourceMappingURL=useRandomUsers.d.ts.map