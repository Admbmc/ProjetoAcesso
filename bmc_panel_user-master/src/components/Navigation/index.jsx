import { Breadcrumb } from "react-bootstrap"

export default function Navigation({active}) {
  return (
    <Breadcrumb className='mt-10' >
      <Breadcrumb.Item href="#">Painel</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{active}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
