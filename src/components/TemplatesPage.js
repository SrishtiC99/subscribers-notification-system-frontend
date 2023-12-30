import { useDispatch, useSelector } from "react-redux";
import '../css/TemplatesPage.css';
import { useState } from "react";
import { createTemplate } from "../api/axiosConfig";
import { addTemplate } from "../actions/actions";
import { useNavigate } from "react-router-dom";

export default function TemplatesPage() {
    const jwtToken = useSelector(state => state.auth.jwtToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var [templates, setTemplates] = useState(useSelector(state => state.auth.templates));
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newTemplateData, setTemplateData] = useState({ content: '', title: '' });

    const handleAddTemplate = () => {

        createTemplate(jwtToken, newTemplateData)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                templates = [...templates, response.data];
                dispatch(addTemplate(templates));
                setIsFormVisible(false);
                setTemplateData({ title: '', content: '' })
                setTemplates(templates);
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    const goToTemplateDetailPage = (template) => {
        navigate('/template-details', {state: template})
    }

    return (
        <div>
            <div className="page">
                <h2> Manage Your Templates </h2>
                <div className="template-container">
                    {templates.map(template => (
                        <div className="template" key={template.id} onClick={() => goToTemplateDetailPage(template)}>
                            <p className="template-title">{template.title}</p>
                            <p className="template-content">{template.content}</p>
                            <button>Notify</button>
                        </div>
                    ))}
                </div>
                <br />
                <button className="add-template" onClick={() => { setIsFormVisible(true) }}>Add New</button>
                {isFormVisible && (
                    <div className="add-template-form">
                        <div className="form-item">
                            <label>
                                Title:&nbsp;&nbsp;
                                <input
                                    type="text"
                                    value={newTemplateData.title}
                                    onChange={(e) => setTemplateData({ ...newTemplateData, title: e.target.value })}
                                />
                            </label>
                        </div>
                        <br />
                        <div>
                            <label>
                                Content:&nbsp;&nbsp;&nbsp;&nbsp;
                                <textarea
                                    value={newTemplateData.content}
                                    onChange={(e) => setTemplateData({ ...newTemplateData, content: e.target.value })}
                                    rows={8}
                                    cols={40}
                                />
                            </label>
                        </div>
                        <br />
                        <button onClick={handleAddTemplate}>Submit</button>
                        &nbsp;&nbsp;
                        <button onClick={() => { setIsFormVisible(false); setTemplateData({ title: '', content: '' }) }}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}