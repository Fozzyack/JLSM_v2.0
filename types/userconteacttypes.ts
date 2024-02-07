
export type TeacherContact = {
    name: string | undefined | null,
    email: string,
    image: string | undefined | null,
    privilege: number,
    // class
}

export type Classmate = {
    image: string | undefined | null,
    email: string,
    name: string | undefined | null,
    // classes
}

export type User = {
    id: string
    image: string | undefined | null,
    email: string,
    name: string | undefined | null,
    privilege: number,
    balance: number,
    verified: boolean,
}
