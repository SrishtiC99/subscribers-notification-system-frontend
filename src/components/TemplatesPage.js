import { useState } from "react";
import { useSelector } from "react-redux";

export default function TemplatesPage() {
    const [templates, setTemplates] = useState(useSelector(state => state.auth.templates));
    
    return (
        <div>
            <h2> Manage Your Templates </h2>
            <ul>
                {templates.map(template => (
                    <li key={template.id}>
                        <h4>{template.title}</h4>
                        <p>{template.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}