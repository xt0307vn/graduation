import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export default function Message({chat}) {
    return (
        !chat.hide && (
            <div className={`message ${chat?.role}__message`}>
                {chat?.role == 'chatbot' && (
                    <div className="chatbot__icon">
                        <FontAwesomeIcon icon={faRobot} />
                    </div>
                )}<p className="message__text shadow-md" dangerouslySetInnerHTML={{__html: chat?.message}}></p>
            </div>
        )
    )
}