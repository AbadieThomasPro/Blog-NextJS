import { ReactNode } from "react"
import { Alert } from "@/components/ui/alert"
import { Note } from "lucide-react"

export type MdxNoteProps = {
    childre: ReactNode,
}

export const MdxNote = () => {
    return (
        <Alert>
            <Note size={12} />
            <div></div>
        </Alert>
    )
}