function formatData(data) {
    let ds = data.split('-');
    let dataToShow = `${ds[2]}/${ds[1]}/${ds[0]}`;
    return dataToShow;
}


export default formatData;