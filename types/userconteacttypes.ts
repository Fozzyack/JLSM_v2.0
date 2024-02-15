
export type TeacherContact = {
    id: string
    name: string | undefined | null,
    email: string,
    image: string | undefined | null,
    privilege: number,
    grade: string,
    difficulty: number
    // class
}

export type Classmate = {
    image: string | undefined | null,
    email: string,
    name: string | undefined | null,
    grade: string,
    difficulty: number
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
