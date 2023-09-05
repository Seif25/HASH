"use client"

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter  } from "next/navigation";

import { HashValidation } from "@/lib/validations/hash";

interface Props {
    userId: string;
}

const PostHash: NextPage<Props> = ({userId}) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(HashValidation),
        defaultValues: {
            hash: "",
            accountId: userId
        }
    })
    return (
        <>
        </>
    )
}

export default PostHash;