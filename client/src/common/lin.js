
import axios from 'axios'

/**
 * 公共调用
 */
const lin = {
    /**
     * 调用本地服务器接口
     */
    load: async url => {
        const resp = await axios(`http://localhost:3000${url}`)
        return resp.data
    },
    /**
     * 调用麦蕊接口
     */
    mary: url => {
        const licence = '2FCDC34F-AAE5-426B-99CF-ECC93D531EE3'
        let pathname = url 
        let search = ''
        const urlAry = url.split('?')
        if (urlAry.length == 2) {
            pathname = urlAry[0]
            search = '?' + urlAry[1]
        }
        return new Promise(resolve => {
            const url = `https://api.mairuiapi.com${pathname}/${licence}${search}`
            axios.get(url).then(resp => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    resolve(null)
                }
            }, resp => {
                console.error(`mairui error ${url} ${resp?.response?.data?.message}`)
                resolve(null)
            })
        })
    },

}

export default lin