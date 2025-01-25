import {FC, ReactNode} from "react";
import {Content} from "antd/es/layout/layout";

interface ContentProps {
    children: ReactNode;
}

const PageContent: FC<ContentProps> = ({children}) => {
    return (
        <Content style={{ padding: '0 48px' }}>
            <div
                style={{
                    background: 'white',
                    marginTop: 30,
                    marginBottom: 30,
                    padding: 24,
                    borderRadius: 10,
                }}
            >
                {children}
            </div>
        </Content>
    )
}

export default PageContent