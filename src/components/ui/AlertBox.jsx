import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "./alert"

export function AlertDestructive() {
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Mobile access to this dashboard is restricted , please use a desktop or laptop.
            </AlertDescription>
        </Alert>
    )
}
