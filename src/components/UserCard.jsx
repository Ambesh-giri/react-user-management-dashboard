export default function UserCard({user}){
    return (
        <div className="usercard">
            <h3>Name : {user.firstName} {user.lastName}</h3>
            <p><b>Email : </b>{user.email}</p>
            <p><b>Gender : </b>{user.gender}</p>
            <p><b>City : </b>{user.address.city}</p>
        </div>
    );
}