import { User } from "@/src/domain/entities/User";
import { auth } from "@/src/infrastructure/firebase/firebase";


export class GetUserInfoUseCase{
    async execute(): Promise<User | null>{
        const currentUser = auth.currentUser;
        if(currentUser){
            return{
                uid: currentUser.uid,
                email: currentUser.email ?? '',
                displayName: currentUser.displayName ?? '',
                photoURL:currentUser.photoURL ?? '',
            };
        }
        return null;
    }
}