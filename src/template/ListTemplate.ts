import FullList from "../model/FullList"
// import ListItem from "../model/ListItem"

// const ul = document.getElementById('listItems') as HTMLUListElement


interface DomList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void
}

export default class ListTemplate implements DomList {
    static instance: ListTemplate = new ListTemplate()
    ul: HTMLUListElement
    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }
    render(fullList: FullList): void {
        fullList.list.map(item => {
            const li = document.createElement('li') as HTMLLIElement
            const check = document.createElement('input') as HTMLInputElement
            const label = document.createElement('label') as HTMLLabelElement
            const button = document.createElement('button') as HTMLButtonElement

            li.className = 'item'
            check.type = 'checkbox'
            check.id = item.id
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            button.className = 'button'
            button.textContent = 'X'
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.clear()
                this.render(fullList)
            })
            li.append(button)
            this.ul.append(li)
        })
    }
}