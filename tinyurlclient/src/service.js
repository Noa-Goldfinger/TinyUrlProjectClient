export default function SetLinks(){
    const [links, setLinks] = ([]);
    axios.get(`https://localhost:7063/api/Employee`)
    .then(res => {
        setLinks(res);
    }
    ).catch(err => console.log(err));
}