import { Repost } from "../types/hash.types";

export function checkReposted({username, reposts}:{username: string; reposts: Repost[]}): boolean {
    if (reposts.length > 0){
        const found = reposts.find((repost) => repost.user === username)
        if (found) return true
    }
    return false
}