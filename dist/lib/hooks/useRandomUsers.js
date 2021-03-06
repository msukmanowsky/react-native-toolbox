import { useState, useEffect } from "react";
import queryString from "query-string";
/**
 * Get random users from the https://randomuser.me API.
 *
 * ```typescript
 * const users = useRandomUsers();
 * ```
 * @param options See https://randomuser.me/documentation
 */
const useRandomUsers = (options) => {
    const { apiVersion = "1.3", format = "json", gender = "any", nationalities, passwords, results = 10, seed, } = options;
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const query = queryString.stringify({
            gender,
            passwords,
            format,
            nationalities,
            results,
            seed,
        });
        fetch(`https://randomuser.me/api/${apiVersion}/?${query}`)
            .then(response => response.json())
            .then(response => {
            const users = response.results;
            setUsers(users);
        });
    }, []);
    return users;
};
export default useRandomUsers;
