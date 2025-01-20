import {signIn} from "@/auth"
import type {Session} from '@auth/core/types'

export default function SignIn({session}: { session: Session }) {

    if (!session)
        return (
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <button type="submit">Signin with GitHub</button>
            </form>
        )
    console.log(session)
    return <div>
        userName {session.user.name}
        <br/>
        email {session.user.email}
        <br/>
        expiresTime {session.expires}
        <br/>
        <img src={session.user.image} width={80} height={80}/>
        <img src={'/api/og?name=' + session.user.name} width={80} height={80}/>
        {/*<Image width={80} height={80} alt={''} src={session.user.image}/>*/}
    </div>
}
