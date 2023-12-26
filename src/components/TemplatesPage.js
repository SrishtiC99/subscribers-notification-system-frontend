import { useSelector } from "react-redux";
import '../css/TemplatesPage.css';

export default function TemplatesPage() {
    const templates = useSelector(state => state.auth.templates);

    return (
        <div>
            <h2> Manage Your Templates </h2>
            <div className="template-container">
                {templates.map(template => (
                    <div className="template" key={template.id}>
                        <p className="template-title">{template.title}</p>
                        <p className="template-content">{template.content}</p>
                        <button>Notify</button>
                    </div>
                ))}
            </div>
        </div>
    );
}