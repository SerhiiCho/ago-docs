---
title: Documentation
---

# Documentation

Date/time converter into "n time ago" format that supports multiple languages. You can contribute any language that you wish easily by creating a pull request. I would gladly merge it in if you follow the simple steps.

This package is well tested, optimized and already used in many production apps. It has shown itself pretty well. If you find any issues or bugs 🐞, please create an [issue](https://github.com/SerhiiCho/ago/issues/new), and I'll fix it as soon as I can.

## 🐘 Supported PHP versions

- ✅ 7.1
- ✅ 7.2
- ✅ 7.3
- ✅ 7.4
- ✅ 8.0
- ✅ 8.1
- ✅ 8.2
- ✅ 8.3

## ⚙️ Configurations

### Set language

Default language is English. Optionally you can set the language in your application by calling `set()` method and passing a flag `ru` for Russian or `en` for English language. You can see supported languages in the next section.

```php
Serhii\Ago\Lang::set('ru');
```

### Supported languages

| Flag | Language  | Code (ISO 639-1) |
| ---- | --------- | ---------------- |
| 🇬🇧    | English   | en               |
| 🇷🇺    | Russian   | ru               |
| 🇺🇦    | Ukrainian | uk               |
| 🇳🇱    | Dutch     | nl               |
| 🇩🇪    | German    | de               |

> Make sure to update the package to the latest version to get the latest languages support.

### Overwrite translations
There are cases when you want to replace certain words with specific ones. You can do it with “Overwrites”. All you need to do is just to pass `array<string, string>` of values that you want to overwrite.

For example, instead of `1 minute ago` you want to have the output `1 minute before`. To achieve that, create `['ago' => 'before']` array and pass it as the second argument to method `set()` in `Serhii\Ago\Lang` class.

```php
Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

> The list of all default key values you can find in [resources/lang](https://github.com/SerhiiCho/ago/tree/master/resources/lang) directory.

## 👏 Usage

For outputting post publishing date or something else you can just pass the date to method `trans()`. It will count the interval between now and given date and returns needed format. The methods excepts a timestamp, date string, Carbon instance or DateTime.

```php
use Serhii\Ago\TimeAgo;

TimeAgo::trans('now - 10 seconds'); // output: 10 seconds ago
TimeAgo::trans(time() - 86400); // output: 1 day ago
TimeAgo::trans(\Carbon\Carbon::now()->subDay()); // output: 1 day ago
TimeAgo::trans(\Carbon\CarbonImmutable::now()->subDay()); // output: 1 day ago
TimeAgo::trans((new \DateTime('now - 5 minutes'))); // output: 5 minutes ago
TimeAgo::trans((new \DateTimeImmutable('now - 5 minutes'))); // output: 5 minutes ago
```

When you pass the date in the future, it will output the interval to this date. It's very convenient, because you can pass almost any date format and it will give you the correct output.

```php
TimeAgo::trans(time() + 86400); // output: 1 day
TimeAgo::trans('now + 10 minutes'); // output: 10 minutes
```

> If you use version < 2.2.0 then TimeAgo::trans() method except only type string.

## 🤲 Options

As the seconds argument `trans` method excepts array of options or single option. Here is an example of passed options.

```php
use Serhii\Ago\Option;
use Serhii\Ago\TimeAgo;

TimeAgo::trans('yesterday'); // 1 day ago
TimeAgo::trans('yesterday', Option::NO_SUFFIX); // 1 day
TimeAgo::trans(time(), Option::ONLINE); // Online
TimeAgo::trans(time(), Option::JUST_NOW); // Just now
```

### Available options

All options are available in `Serhii\Ago\Option::class` as constants.

| Option    | Description                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ONLINE    | Display "Online" if date interval within 60 seconds. After 60 seconds output will be the same as usually "x time ago" format. Incompatible with option `JUST_NOW` |
| NO_SUFFIX | Remove suffix from date and have "5 minutes" instead of "5 minutes ago".                                                                                          |
| JUST_NOW  | Prints `Just now` when time is within 1 minutes. For example instead of `34 seconds ago` it will print `Just now`. Incompatible with option `ONLINE`.             |

## 🎁 Contribute another language

If you want to contribute support for a language that is fully supported, all you need to do is to copy/paste 3 files and change them to match the language that you want to add. Then add 1 line to README.md file. Here is my [commit](https://github.com/SerhiiCho/ago/commit/5a7d58569d6cd0af1d7981f3256f59ce19a6ad0e) for supporting Ukrainian language that shows changes that I did. You need to add 3 files for supporting another language. Here are 4 steps that you need to follow.

### How to make a PR

Before you start working on issue, add a comment to it, so that other folks know that someone is already working on it.

When you make a pull request, make sure that you don't pull it in the master branch. Pull it in the next package version. The name of the package version (Realease) matches the name of the branch. You can go to the [branches](https://github.com/SerhiiCho/ago/branches) page, and see what is the latest branch that is not merged, that branch is going to be the next package update.

### 1 Step. Adding translation

Translation files live in `resources/trans` directory. Here is the example of the language file for Russian language.

```php
return [
    'ago' => 'назад',
    'just_now' => 'Только что',
    'online' => 'В сети',
    'second' => 'секунда',
    'seconds' => 'секунды',
    'seconds-special' => 'секунд',
    'minute' => 'минута',
    'minutes' => 'минуты',
    'minutes-special' => 'минут',
    // ... etc ...
];
```

Every translation file return array of translations. Note that `'second-special'` key is optional and can be used for languages that have not only singular and plural form for words like **day**, **minute**, etc... but more.

### 2 Step. Adding rules

Rules live in `resources/rules` directory. Here is the example of the rule file for Russian language.

```php
return static function (int $number, int $last_digit): array {
    return [
        'single' => [
            $number === 1,
            $last_digit === 1 && $number >= 21,
        ],
        'plural' => [
            $number >= 2 && $number < 5,
            $number >= 22 && $last_digit >= 2 && $last_digit < 5,
        ],
        'special' => [
            $number >= 5 && $number <= 20,
            $last_digit === 0,
            $last_digit >= 5 && $last_digit <= 9,
        ],
    ];
};
```

Every rule file should return a callback function with 2 parameters. The callback returns array of associative array. The array contains rules for 3 forms.

- `single` form for words in a single form, like minute, day, year, etc.
- `plural` form for words in a plural form, like minutes, days, years, etc.
- `special` *(optional)* form for special cases, for example in Russian, and Ukrainian we have special forms for words: **недель**, **месяцев**, etc. They are different from single and plural form. So we need to have separate rules for them.

Each form has a boolean rule or array of boolean rules. In Russian example we say that we want to use `single` form when last digit of the number is equal to 1 or number is 0. Now when we see date `1 day ago` in Russian the output will be `1 день назад`, which is the correct translation that we got from `resources/lang/ru.php` file where we have line `'day' => 'день'`. We can give either boolean to each rule or array of booleans when we have many cases for the form. In our example we have 3 cases for `special` form. If one of them will be true, special form will be applied.

### 3 Step. Adding tests

Tests for all translations are live in `tests/Translations` directory. Just copy one of the existing tests and change it whatever you want to match your language. Just make sure you have enough cases to cover specifics of your language. If you don't know about [PHPUnit Data Providers](https://phpunit.de/manual/3.7/en/writing-tests-for-phpunit.html) you might want to read about it.

### 4 Step. Add 1 line to README.md

After all tests are passing, you need to do last step and add language support to README.md file to **Supported languages** section.

## 🚀 Quick Start

```bash
composer require serhii/ago
```